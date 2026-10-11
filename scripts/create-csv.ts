import fs from "node:fs";
import path from "node:path";

type ProductCategory =
	| "airfryers"
	| "ar-condicionado"
	| "caixa-de-som"
	| "cameras-de-seguranca"
	| "cpus"
	| "drones"
	| "fones-de-ouvido"
	| "geladeiras"
	| "gpus"
	| "cameras"
	| "microondas"
	| "monitores"
	| "mouses"
	| "notebooks"
	| "placa-mae"
	| "maquinas-lavar-roupas"
	| "smartphones"
	| "smart-tvs"
	| "smartwatches"
	| "tablets"
	| "teclados";

interface BaseProduct {
	id: string;
	name: string;
	brand: string;
	line?: string;
	model: string;
	detailedModel?: string;
	color?: string;
	image: string;
	price: number;
	releaseDate: string;
	releaseMonth?: number;
	releaseYear?: number;
	origin?: string;
	category: ProductCategory;
	anatelNumber?: string;
	amazonUrl?: string;
	mercadolivreUrl?: string;
	shopeeUrl?: string;
	alphanumericModel?: string;
	version?: string;
	manufacturer?: string;
}

interface ParsedProduct {
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

const categoryToSingular: Record<ProductCategory, string> = {
	airfryers: "Air Fryer",
	"ar-condicionado": "Ar-Condicionado",
	"caixa-de-som": "Caixa de Som",
	"cameras-de-seguranca": "Câmera de Segurança",
	cpus: "Processador",
	drones: "Drone",
	"fones-de-ouvido": "Fone de Ouvido",
	geladeiras: "Geladeira",
	gpus: "Placa de Vídeo",
	microondas: "Microondas",
	monitores: "Monitor",
	mouses: "Mouse",
	notebooks: "Notebook",
	"placa-mae": "Placa-Mãe",
	"maquinas-lavar-roupas": "Máquina De Lavar Roupa",
	smartphones: "Smartphone",
	"smart-tvs": "Smart TV",
	smartwatches: "Smartwatch",
	tablets: "Tablet",
	teclados: "Teclado",
	cameras: "Câmera",
};

function getDataPath(): string {
	return path.join(process.cwd(), "data");
}

function getAllJsonFiles(dir: string): string[] {
	try {
		return fs
			.readdirSync(dir)
			.filter((file) => file.endsWith(".json"))
			.map((file) => path.join(dir, file));
	} catch {
		return [];
	}
}

function parseProductsToCsv(products: BaseProduct[]): ParsedProduct[] {
	return products.map((product) => ({
		blog_post_id: product.id,
		slug: product.id,
		category: product.category,
		product_image: product.image,
		product_name: `${categoryToSingular[product.category]} ${product.brand} ${product.name}`,
		link_shopee: product.shopeeUrl || "",
		link_mercadolivre: product.mercadolivreUrl || "",
		link_amazon: product.amazonUrl || "",
		cupom_amazon: "",
		cupom_mercadolivre: "",
		cupom_shopee: "",
	}));
}

function generateCsvContent(parsedProducts: ParsedProduct[]): string {
	const header =
		"blog_post_id,slug,category,product_image,product_name,link_shopee,link_mercadolivre,link_amazon,cupom_amazon,cupom_mercadolivre,cupom_shopee\n";

	const rows = parsedProducts.map((product) => {
		const escapeCsvValue = (value: string): string => {
			if (value.includes(",") || value.includes('"') || value.includes("\n")) {
				return `"${value.replaceAll(/"/g, '""')}"`;
			}
			return value;
		};

		return [
			escapeCsvValue(product.blog_post_id),
			escapeCsvValue(product.slug),
			escapeCsvValue(product.category),
			escapeCsvValue(product.product_image),
			escapeCsvValue(product.product_name),
			escapeCsvValue(product.link_shopee),
			escapeCsvValue(product.link_mercadolivre),
			escapeCsvValue(product.link_amazon),
			escapeCsvValue(product.cupom_amazon),
			escapeCsvValue(product.cupom_mercadolivre),
			escapeCsvValue(product.cupom_shopee),
		].join(",");
	});

	return header + rows.join("\n");
}

function extractProducts(): void {
	console.log("\n🔍 Extraindo produtos\n");

	const dataPath = getDataPath();

	if (!fs.existsSync(dataPath)) {
		console.error(`❌ Diretório não encontrado: ${dataPath}`);
		return;
	}

	const jsonFiles = getAllJsonFiles(dataPath);

	if (jsonFiles.length === 0) {
		console.log("⚠️ Nenhum arquivo .json encontrado");
		return;
	}

	const allParsedProducts: ParsedProduct[] = [];

	jsonFiles.forEach((filePath) => {
		const fileName = path.basename(filePath);

		try {
			const content = fs.readFileSync(filePath, "utf8");
			const products: BaseProduct[] = JSON.parse(content);

			if (products.length > 0) {
				console.log(`✅ ${fileName} — ${products.length} produto(s) encontrado(s)`);
				const parsedProducts = parseProductsToCsv(products);
				allParsedProducts.push(...parsedProducts);
			}
		} catch (error) {
			console.error(`❌ Erro ao processar ${fileName}:`, error);
		}
	});

	if (allParsedProducts.length === 0) {
		console.log("\n⚠️ Nenhum produto encontrado");
		return;
	}

	const csvContent = generateCsvContent(allParsedProducts);
	const outputDir = path.join(process.cwd(), "telegram");
	const outputPath = path.join(outputDir, "produtos.csv");
	fs.writeFileSync(outputPath, csvContent, "utf8");

	console.log(`\n✅ Total de produtos extraídos: ${allParsedProducts.length}`);
	console.log(`📄 Arquivo CSV gerado: ${outputPath}`);
}

function main(): void {
	extractProducts();
}

if (require.main === module) {
	main();
}
