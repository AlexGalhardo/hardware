// Admin sign-in: Google only, no database. The session lives in a signed cookie (better-auth stateless mode) and
// every request re-checks the e-mail against ADMIN_EMAILS, so removing an address locks its owner out at once.
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAllowedAdmin } from "./allow-list";

export interface AdminUser {
	name: string;
	email: string;
}

const REQUIRED = ["BETTER_AUTH_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "ADMIN_EMAILS"] as const;

/** What is still missing for the admin to work, by env var name. Shown on the login page. */
export function missingAuthConfig(): string[] {
	return REQUIRED.filter((name) => !process.env[name]);
}

function createAuth() {
	const env = process.env;
	return betterAuth({
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		socialProviders: {
			google: { clientId: env.GOOGLE_CLIENT_ID ?? "", clientSecret: env.GOOGLE_CLIENT_SECRET ?? "" },
		},
		plugins: [nextCookies()],
	});
}

let instance: ReturnType<typeof createAuth> | undefined;

/** Built on first use and only when fully configured, so a build without the secrets does not fail or warn. */
export function getAuth(): ReturnType<typeof createAuth> | null {
	if (missingAuthConfig().length) return null;
	instance ??= createAuth();
	return instance;
}

/** The signed-in Google account, admin or not. */
async function getSessionUser(): Promise<{ name: string; email: string; emailVerified: boolean } | null> {
	const session = await getAuth()?.api.getSession({ headers: await headers() });
	return session?.user ?? null;
}

/** The signed-in admin, or null: no session, e-mail not verified by Google, or e-mail not on the list. */
export async function getAdmin(): Promise<AdminUser | null> {
	const user = await getSessionUser();
	if (!user || !isAllowedAdmin(user.email, user.emailVerified, process.env.ADMIN_EMAILS ?? "")) return null;
	return { name: user.name, email: user.email };
}

/**
 * For pages: the admin, or a redirect to the login page. Every admin page calls it itself, because a layout
 * renders alongside its page and does not protect the data the page loads.
 */
export async function requireAdmin(): Promise<AdminUser> {
	const admin = await getAdmin();
	if (admin) return admin;
	// A Google account that signed in but is not on the list is told so instead of looping on the login page.
	redirect((await getSessionUser()) ? "/admin/login?erro=acesso" : "/admin/login");
}
