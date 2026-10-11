import TelegramBot from "node-telegram-bot-api";
import * as fs from "node:fs";
import * as path from "node:path";
import Papa from "papaparse";

interface Product {
	blog_post_id: string;
	slug: string;
	category: string;
	product_image: string;
	product_name: string;
	link_shopee: string;
	link_mercadolivre: string;
	link_amazon: string;
	cupom_amazon: string;
	cupom_mercadolivre: string;
	cupom_shopee: string;
}

interface ScheduleConfig {
	hour: number;
	minute: number;
	label: string;
}

interface EnvConfig {
	TELEGRAM_BOT_TOKEN: string;
	TELEGRAM_CHAT_ID: string;
	CSV_FILE_PATH: string;
	TELEGRAM_TESTS_ENVIROMENT: boolean;
	TELEGRAM_BOT_MESSAGES_UPPERCASE: boolean;
	TELEGRAM_BOT_SEND_MESSAGE_EVERY_10_SECONDS: boolean;
}

type MessageTemplate = (product: Product, useUppercase: boolean) => string;

class CsvService {
	private readonly filePath: string;
	private products: Product[] = [];
	private shuffledProducts: Product[] = [];
	private currentIndex: number = 0;

	constructor(filePath: string) {
		this.filePath = filePath;
		this.loadProducts();
	}

	private shuffleArray<T>(array: T[]): T[] {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	private loadProducts(): void {
		try {
			if (!fs.existsSync(this.filePath)) {
				throw new Error(`Arquivo não encontrado: ${this.filePath}`);
			}

			const fileContent = fs.readFileSync(this.filePath, "utf8");
			const parsed = Papa.parse<Product>(fileContent, {
				header: true,
				skipEmptyLines: true,
			});

			this.products = parsed.data.filter(
				(product) =>
					product.product_name &&
					product.product_image &&
					(product.link_shopee || product.link_mercadolivre || product.link_amazon),
			);

			this.shuffledProducts = this.shuffleArray(this.products);
			this.currentIndex = 0;

			console.log(`✅ ${this.products.length} produtos carregados e embaralhados do CSV`);
		} catch (error) {
			console.error("❌ Erro ao carregar arquivo CSV:", error);
			throw error;
		}
	}

	public getNextProduct(): Product | null {
		if (this.shuffledProducts.length === 0) {
			console.warn("⚠️ Nenhum produto disponível");
			return null;
		}

		if (this.currentIndex >= this.shuffledProducts.length) {
			console.log("🔄 Reembaralhando produtos...");
			this.shuffledProducts = this.shuffleArray(this.products);
			this.currentIndex = 0;
		}

		const product = this.shuffledProducts[this.currentIndex];
		this.currentIndex++;

		return product;
	}

	public reloadProducts(): void {
		console.log("🔄 Recarregando produtos do CSV...");
		this.loadProducts();
	}

	public getTotalProducts(): number {
		return this.products.length;
	}

	public getCurrentIndex(): number {
		return this.currentIndex;
	}
}

class TelegramService {
	private readonly bot: TelegramBot;
	private readonly chatId: string;
	private readonly useUppercase: boolean;
	private readonly messageTemplates: MessageTemplate[];

	constructor(token: string, chatId: string, useUppercase: boolean = false) {
		this.bot = new TelegramBot(token, { polling: false });
		this.chatId = chatId;
		this.useUppercase = useUppercase;
		this.messageTemplates = this.initializeTemplates();
	}

	private applyTextTransform(text: string): string {
		return this.useUppercase ? text.toUpperCase() : text;
	}

	private initializeTemplates(): MessageTemplate[] {
		return [
			(product: Product, useUppercase: boolean) => {
				const transform = (text: string) => (useUppercase ? text.toUpperCase() : text);
				let message = `💎 ${transform(product.product_name)}\n\n`;
				message += `${transform("Achei essa oferta incrível pra você!")}\n\n`;
				message += `${transform("Onde comprar:")}\n`;
				message += this.buildLinks(product, transform);
				message += this.buildCoupons(product, transform);
				message += `\n✨ ${transform("Aproveita que tá com preço bom!")}`;
				return message;
			},
			(product: Product, useUppercase: boolean) => {
				const transform = (text: string) => (useUppercase ? text.toUpperCase() : text);
				let message = `🔥 ${transform("OFERTA IMPERDÍVEL!")}\n\n`;
				message += `📦 ${transform(product.product_name)}\n\n`;
				message += `${transform("Links para comprar:")}\n`;
				message += this.buildLinks(product, transform);
				message += this.buildCoupons(product, transform);
				message += `\n💡 ${transform("Corre que essa promoção não vai durar muito!")}`;
				return message;
			},
			(product: Product, useUppercase: boolean) => {
				const transform = (text: string) => (useUppercase ? text.toUpperCase() : text);
				let message = `⚡ ${transform(product.product_name)}\n\n`;
				message += `${transform("Olha só que preço top!")}\n\n`;
				message += `${transform("Onde comprar:")}\n`;
				message += this.buildLinks(product, transform);
				message += this.buildCoupons(product, transform);
				message += `\n🎯 ${transform("Não perde essa chance!")}`;
				return message;
			},
			(product: Product, useUppercase: boolean) => {
				const transform = (text: string) => (useUppercase ? text.toUpperCase() : text);
				let message = `🎁 ${transform("ACHEI ESSA PROMO PRA VOCÊS!")}\n\n`;
				message += `${transform(product.product_name)}\n\n`;
				message += `${transform("Disponível aqui:")}\n`;
				message += this.buildLinks(product, transform);
				message += this.buildCoupons(product, transform);
				message += `\n🚀 ${transform("Aproveita antes que acabe!")}`;
				return message;
			},
			(product: Product, useUppercase: boolean) => {
				const transform = (text: string) => (useUppercase ? text.toUpperCase() : text);
				let message = `💥 ${transform(product.product_name)}\n\n`;
				message += `${transform("Preço muito bom gente, olha aí:")}\n\n`;
				message += `${transform("Onde comprar:")}\n`;
				message += this.buildLinks(product, transform);
				message += this.buildCoupons(product, transform);
				message += `\n🔔 ${transform("Quem comprar me conta aqui nos comentários!")}`;
				return message;
			},
		];
	}

	private buildLinks(product: Product, transform: (text: string) => string): string {
		let links = "";

		if (product.link_amazon) {
			links += `\n🛒 ${transform("Amazon")}: ${product.link_amazon}\n`;
		}

		if (product.link_mercadolivre) {
			links += `\n🛒 ${transform("Mercado Livre")}: ${product.link_mercadolivre}\n`;
		}

		if (product.link_shopee) {
			links += `\n🛒 ${transform("Shopee")}: ${product.link_shopee}\n`;
		}

		return links;
	}

	private buildCoupons(product: Product, transform: (text: string) => string): string {
		let coupons = "";
		const hasCoupons = product.cupom_amazon || product.cupom_mercadolivre || product.cupom_shopee;

		if (hasCoupons) {
			coupons += `\n${transform("Cupons disponíveis:")}\n`;

			if (product.cupom_amazon) {
				coupons += `\n🎟️ ${transform("Amazon")}: ${product.cupom_amazon}`;
			}

			if (product.cupom_mercadolivre) {
				coupons += `\n🎟️ ${transform("Mercado Livre")}: ${product.cupom_mercadolivre}`;
			}

			if (product.cupom_shopee) {
				coupons += `\n🎟️ ${transform("Shopee")}: ${product.cupom_shopee}`;
			}

			coupons += "\n";
		}

		return coupons;
	}

	private getRandomTemplate(): MessageTemplate {
		const randomIndex = Math.floor(Math.random() * this.messageTemplates.length);
		return this.messageTemplates[randomIndex];
	}

	private formatMessage(product: Product): string {
		const template = this.getRandomTemplate();
		return template(product, this.useUppercase);
	}

	public async sendProduct(product: Product): Promise<boolean> {
		try {
			const message = this.formatMessage(product);

			if (product.product_image) {
				await this.bot.sendPhoto(this.chatId, product.product_image, {
					caption: message,
					parse_mode: "HTML",
				});
			} else {
				await this.bot.sendMessage(this.chatId, message, {
					parse_mode: "HTML",
					disable_web_page_preview: false,
				});
			}

			console.log(`✅ Produto enviado: ${product.product_name}`);
			return true;
		} catch (error) {
			console.error("❌ Erro ao enviar produto:", error);
			return false;
		}
	}

	public async sendTestMessage(): Promise<boolean> {
		try {
			console.log("✅ Mensagem de teste enviada com sucesso");
			return true;
		} catch (error) {
			console.error("❌ Erro ao enviar mensagem de teste:", error);
			return false;
		}
	}
}

class SchedulerService {
	private readonly csvService: CsvService;
	private readonly telegramService: TelegramService;
	private readonly isTestMode: boolean;
	private readonly every10Seconds: boolean;
	private intervalTimer: NodeJS.Timeout | null = null;
	private nextScheduledTime: Date | null = null;
	private scheduledTimeout: NodeJS.Timeout | null = null;
	private dailyCheckInterval: NodeJS.Timeout | null = null;

	constructor(
		csvService: CsvService,
		telegramService: TelegramService,
		isTestMode: boolean,
		every10Seconds: boolean,
	) {
		this.csvService = csvService;
		this.telegramService = telegramService;
		this.isTestMode = isTestMode;
		this.every10Seconds = every10Seconds;
	}

	private getSaoPauloTime(): Date {
		return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
	}

	private isWithinAllowedHours(): boolean {
		const now = this.getSaoPauloTime();
		const hour = now.getHours();
		return hour >= 8 && hour < 22;
	}

	private getRandomMinutesDelay(): number {
		return Math.floor(Math.random() * (60 - 45 + 1)) + 45;
	}

	private getInitialDelay(): number {
		const now = this.getSaoPauloTime();
		const currentHour = now.getHours();
		const currentMinute = now.getMinutes();

		if (currentHour < 8) {
			const target = new Date(now);
			target.setHours(8, Math.floor(Math.random() * 31), 0, 0);
			return target.getTime() - now.getTime();
		}

		if (currentHour >= 22) {
			const tomorrow = new Date(now);
			tomorrow.setDate(tomorrow.getDate() + 1);
			tomorrow.setHours(8, Math.floor(Math.random() * 31), 0, 0);
			return tomorrow.getTime() - now.getTime();
		}

		if (currentHour === 8 && currentMinute < 30) {
			const remainingMinutes = 30 - currentMinute;
			const randomMinutes = Math.floor(Math.random() * remainingMinutes);
			return randomMinutes * 60 * 1000;
		}

		return 0;
	}

	private getNextAllowedTime(delayMs: number): Date {
		const now = this.getSaoPauloTime();
		let nextTime = new Date(now.getTime() + delayMs);
		const nextHour = nextTime.getHours();

		if (nextHour >= 22 || nextHour < 8) {
			const tomorrow = new Date(nextTime);
			if (nextHour >= 22) {
				tomorrow.setDate(tomorrow.getDate() + 1);
			}
			tomorrow.setHours(8, Math.floor(Math.random() * 31), 0, 0);
			return tomorrow;
		}

		return nextTime;
	}

	private async sendScheduledProduct(label: string): Promise<void> {
		if (!this.isWithinAllowedHours() && !this.isTestMode && !this.every10Seconds) {
			const now = this.getSaoPauloTime();
			console.log(`⏸️ Fora do horário permitido (${now.getHours()}h). Aguardando próximo período.`);
			return;
		}

		console.log(`\n📢 Enviando produto agendado (${label})...`);

		const product = this.csvService.getNextProduct();

		if (!product) {
			console.warn("⚠️ Nenhum produto disponível para enviar");
			return;
		}

		await this.telegramService.sendProduct(product);
	}

	private scheduleNextMessage(): void {
		const delayMinutes = this.getRandomMinutesDelay();
		const delayMs = delayMinutes * 60 * 1000;

		this.nextScheduledTime = this.getNextAllowedTime(delayMs);
		const now = this.getSaoPauloTime();
		const actualDelay = this.nextScheduledTime.getTime() - now.getTime();

		console.log(
			`⏰ Próxima mensagem agendada para: ${this.nextScheduledTime.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`,
		);
		console.log(`⏱️  Intervalo: ${Math.round(actualDelay / 60000)} minutos\n`);

		this.scheduledTimeout = setTimeout(async () => {
			await this.sendScheduledProduct("Agendado");
			this.scheduleNextMessage();
		}, actualDelay);
	}

	private startEvery10SecondsMode(): void {
		console.log("\n⚡ MODO: ENVIO A CADA 10 SEGUNDOS");
		console.log("⏱️  Enviando produtos continuamente a cada 10 segundos...\n");
		console.log(`📊 Total de produtos: ${this.csvService.getTotalProducts()}`);
		console.log("🚀 Bot em execução!\n");

		let counter = 1;
		this.intervalTimer = setInterval(async () => {
			const now = this.getSaoPauloTime().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });
			console.log(`\n[Envio #${counter} - ${now}]`);
			await this.sendScheduledProduct(`Envio ${counter}`);
			counter++;
		}, 10000);
	}

	private startTestMode(): void {
		console.log("\n🧪 MODO DE TESTE ATIVADO");
		console.log("⏱️  Enviando produtos a cada 30 segundos (teste)...\n");
		console.log(`📊 Total de produtos: ${this.csvService.getTotalProducts()}`);
		console.log("🚀 Bot em execução!\n");

		let counter = 1;
		this.intervalTimer = setInterval(async () => {
			console.log(`\n[Teste #${counter}]`);
			await this.sendScheduledProduct(`Teste ${counter}`);
			counter++;
		}, 30000);
	}

	private startProductionMode(): void {
		console.log("\n⏰ MODO PRODUÇÃO: Envios entre 8h-22h (Horário de São Paulo)\n");
		console.log(`📊 Total de produtos: ${this.csvService.getTotalProducts()}`);

		const initialDelay = this.getInitialDelay();

		if (initialDelay > 0) {
			const firstMessageTime = new Date(this.getSaoPauloTime().getTime() + initialDelay);
			console.log(
				`🕐 Primeira mensagem será enviada às ${firstMessageTime.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}\n`,
			);

			this.scheduledTimeout = setTimeout(async () => {
				await this.sendScheduledProduct("Primeiro envio");
				this.scheduleNextMessage();
			}, initialDelay);
		} else {
			console.log(`🚀 Enviando primeira mensagem agora e agendando próximas...\n`);
			this.sendScheduledProduct("Primeiro envio").then(() => {
				this.scheduleNextMessage();
			});
		}

		this.dailyCheckInterval = setInterval(() => {
			if (!this.isWithinAllowedHours() && this.scheduledTimeout) {
				console.log("🌙 Fora do horário de operação. Pausando até amanhã às 8h.");
			}
		}, 60000);

		console.log("✅ Sistema de envio humanizado iniciado!");
		console.log("📝 Horário: 8h-22h (São Paulo)");
		console.log("📝 Intervalos: 45-60 minutos entre cada mensagem\n");
	}

	public start(): void {
		if (this.every10Seconds) {
			this.startEvery10SecondsMode();
		} else if (this.isTestMode) {
			this.startTestMode();
		} else {
			this.startProductionMode();
		}
	}

	public stop(): void {
		if (this.intervalTimer) {
			clearInterval(this.intervalTimer);
			this.intervalTimer = null;
			console.log("⏹️ Intervalo parado");
		}

		if (this.scheduledTimeout) {
			clearTimeout(this.scheduledTimeout);
			this.scheduledTimeout = null;
			console.log("⏹️ Timeout agendado cancelado");
		}

		if (this.dailyCheckInterval) {
			clearInterval(this.dailyCheckInterval);
			this.dailyCheckInterval = null;
			console.log("⏹️ Verificação diária parada");
		}
	}

	public async sendNow(): Promise<void> {
		console.log("\n📤 Enviando produto imediatamente...");
		await this.sendScheduledProduct("Manual");
	}
}

function loadEnvConfig(): EnvConfig {
	const token = process.env.TELEGRAM_BOT_TOKEN;
	const chatId = process.env.TELEGRAM_CHAT_ID;
	const csvPath = process.env.CSV_FILE_PATH || "./produtos.csv";
	const isTestMode = process.env.TELEGRAM_TESTS_ENVIROMENT === "true";
	const useUppercase = process.env.TELEGRAM_BOT_MESSAGES_UPPERCASE === "true";
	const every10Seconds = process.env.TELEGRAM_BOT_SEND_MESSAGE_EVERY_10_SECONDS === "true";

	if (!token || !chatId) {
		console.error("❌ ERRO: Configure TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID nas variáveis de ambiente");
		process.exit(1);
	}

	return {
		TELEGRAM_BOT_TOKEN: token,
		TELEGRAM_CHAT_ID: chatId,
		CSV_FILE_PATH: csvPath,
		TELEGRAM_TESTS_ENVIROMENT: isTestMode,
		TELEGRAM_BOT_MESSAGES_UPPERCASE: useUppercase,
		TELEGRAM_BOT_SEND_MESSAGE_EVERY_10_SECONDS: every10Seconds,
	};
}

console.log("🤖 Iniciando Bot de Ofertas Telegram...\n");

async function main() {
	const config = loadEnvConfig();

	try {
		console.log("📦 Inicializando serviços...");
		const csvService = new CsvService(path.resolve(config.CSV_FILE_PATH));

		console.log("🔌 Configurando conexão com Telegram...");
		const telegramService = new TelegramService(
			config.TELEGRAM_BOT_TOKEN,
			config.TELEGRAM_CHAT_ID,
			config.TELEGRAM_BOT_MESSAGES_UPPERCASE,
		);

		console.log("⚙️  Configurando scheduler...");
		const schedulerService = new SchedulerService(
			csvService,
			telegramService,
			config.TELEGRAM_TESTS_ENVIROMENT,
			config.TELEGRAM_BOT_SEND_MESSAGE_EVERY_10_SECONDS,
		);

		console.log("🔍 Testando conexão com Telegram...");
		await telegramService.sendTestMessage();

		schedulerService.start();

		const cleanup = () => {
			console.log("\n\n👋 Encerrando bot...");
			schedulerService.stop();
			process.exit(0);
		};

		process.on("SIGINT", cleanup);
		process.on("SIGTERM", cleanup);

		console.log("✨ Bot inicializado com sucesso!\n");

		await new Promise(() => {});
	} catch (error) {
		console.error("❌ Erro fatal:", error);
		console.error("Stack trace:", error instanceof Error ? error.stack : "N/A");
		process.exit(1);
	}
}

main().catch((error) => {
	console.error("❌ Erro não capturado:", error);
	process.exit(1);
});
