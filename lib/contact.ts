import { createTelegramLogger } from "@galhardoalex/telegram-logger";
import { z } from "zod";

export const CONTACT_TYPES = ["Bug", "Dúvida", "Sugestão/Feedback", "Outros assuntos"] as const;

export function capitalize(value: string): string {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

export const contactSchema = z.object({
	name: z
		.string()
		.trim()
		.min(4, "O nome precisa ter ao menos 4 caracteres.")
		.max(16, "O nome pode ter no máximo 16 caracteres.")
		.transform(capitalize),
	email: z
		.email("E-mail inválido.")
		.min(12, "O e-mail precisa ter ao menos 12 caracteres.")
		.max(48, "O e-mail pode ter no máximo 48 caracteres."),
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
		appName: "tudohardware",
		fetch: fetchFn,
	});
	const result = await logger.contact({ name, email, tipo: type, message });
	if (result.ok) return { ok: true };
	console.error("Contact delivery failed:", result.reason);
	return { ok: false, error: "Não foi possível enviar agora. Tente novamente em alguns minutos." };
}
