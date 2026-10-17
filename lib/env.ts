// Shape of the environment. Used by scripts/check-env.ts at the start of every build: a malformed value always
// fails the build, and a missing essential value fails the production build.
import { z } from "zod";

const emailList = z
	.string()
	.trim()
	.refine(
		(value) =>
			value
				.split(",")
				.map((entry) => entry.trim())
				.every((entry) => z.email().safeParse(entry).success),
		"lista de e-mails separados por vírgula",
	);

/** Every variable is optional here; `ESSENTIAL` says which ones production cannot run without. */
export const envSchema = z.object({
	LINKS_DASHBOARD_TOKEN: z.string().min(32, "chave com 32 caracteres ou mais").optional(),
	BETTER_AUTH_SECRET: z.string().min(32, "segredo com 32 caracteres ou mais").optional(),
	BETTER_AUTH_URL: z.url({ protocol: /^https?$/, error: "endereço http(s)" }).optional(),
	GOOGLE_CLIENT_ID: z
		.string()
		.regex(/^[\w-]+\.apps\.googleusercontent\.com$/, "termina em .apps.googleusercontent.com")
		.optional(),
	// A longer value means another variable was glued onto the line, which Google answers with invalid_code.
	GOOGLE_CLIENT_SECRET: z
		.string()
		.regex(/^GOCSPX-[\w-]{28}$/, "formato GOCSPX- seguido de 28 caracteres")
		.optional(),
	ADMIN_EMAILS: emailList.optional(),
	GITHUB_TOKEN: z
		.string()
		.regex(/^(github_pat_|ghp_|gho_)\w+$/, "token do GitHub")
		.optional(),
	GITHUB_REPO: z
		.string()
		.regex(/^[\w.-]+\/[\w.-]+$/, "formato dono/repositório")
		.optional(),
	GITHUB_BRANCH: z.string().min(1).optional(),
	TELEGRAM_BOT_TOKEN: z
		.string()
		.regex(/^\d+:[\w-]{30,}$/, "token do BotFather (número:chave)")
		.optional(),
	TELEGRAM_CHAT_ID: z
		.string()
		.regex(/^(-?\d+|@\w+)$/, "id numérico do chat ou @canal")
		.optional(),
});

export const ESSENTIAL = [
	"LINKS_DASHBOARD_TOKEN",
	"BETTER_AUTH_SECRET",
	"BETTER_AUTH_URL",
	"GOOGLE_CLIENT_ID",
	"GOOGLE_CLIENT_SECRET",
	"ADMIN_EMAILS",
	"GITHUB_TOKEN",
	"GITHUB_REPO",
	"TELEGRAM_BOT_TOKEN",
	"TELEGRAM_CHAT_ID",
] as const satisfies readonly (keyof z.infer<typeof envSchema>)[];

/**
 * Problems of an environment, one line each, naming the variable and never its value.
 * An empty string counts as not set, which is how .env.example ships.
 */
export function envProblems(env: Record<string, string | undefined>, production: boolean): string[] {
	const present = Object.fromEntries(Object.entries(env).filter(([, value]) => value !== undefined && value !== ""));
	const parsed = envSchema.safeParse(present);
	const problems = parsed.success
		? []
		: parsed.error.issues.map((issue) => `${issue.path.join(".")}: valor inválido (${issue.message})`);
	if (production)
		for (const name of ESSENTIAL)
			if (!present[name]) problems.push(`${name}: obrigatória em produção e não definida`);
	return problems;
}
