import { createTelegramLogger } from "@galhardoalex/telegram-logger";
import { z } from "zod";

export const CONTACT_TYPES = ["Bug", "Dúvida", "Sugestão/Feedback", "Outros assuntos"] as const;

export const contactSchema = z.object({
	name: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
	email: z.email("E-mail inválido.").max(200),
	type: z.enum(CONTACT_TYPES, "Escolha o tipo de contato."),
	message: z
		.string()
		.trim()
		.min(32, "A mensagem precisa ter ao menos 32 caracteres.")
		.max(512, "A mensagem pode ter no máximo 512 caracteres."),
	// Honeypot: hidden from people, filled in by spam bots.
	website: z.string().max(0).optional(),
});

export type ContactResult = { ok: true } | { ok: false; error: string };

/** Validates a contact form submission and sends it to the owner's Telegram chat. */
export async function sendContact(
	input: unknown,
	env: Record<string, string | undefined> = process.env,
	fetchFn: typeof fetch = fetch,
): Promise<ContactResult> {
	const parsed = contactSchema.safeParse(input);
	if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
	const { name, email, type, message } = parsed.data;
	const logger = createTelegramLogger({
		botToken: env.TELEGRAM_BOT_TOKEN,
		chatId: env.TELEGRAM_CHAT_ID,
		appName: "tudohardware.com",
		fetch: fetchFn,
	});
	const result = await logger.contact({ name, email, tipo: type, message });
	if (result.ok) return { ok: true };
	console.error("Contact delivery failed:", result.reason);
	return { ok: false, error: "Não foi possível enviar agora. Tente novamente em alguns minutos." };
}
