// Shape of the environment. Used by scripts/check-env.ts at the start of every build: a malformed value fails the build.
import { z } from "zod";

/** Every variable is optional: a clone with no .env still builds. */
export const envSchema = z.object({
	LINKS_DASHBOARD_TOKEN: z.string().min(32, "chave com 32 caracteres ou mais").optional(),
});

/**
 * Problems of an environment, one line each, naming the variable and never its value.
 * An empty string counts as not set, which is how .env.example ships.
 */
export function envProblems(env: Record<string, string | undefined>): string[] {
	const present = Object.fromEntries(Object.entries(env).filter(([, value]) => value !== undefined && value !== ""));
	const parsed = envSchema.safeParse(present);
	return parsed.success
		? []
		: parsed.error.issues.map((issue) => `${issue.path.join(".")}: valor inválido (${issue.message})`);
}
