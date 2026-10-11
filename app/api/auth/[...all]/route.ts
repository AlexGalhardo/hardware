import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/admin/auth";

const unavailable = (): Response => Response.json({ error: "Login não configurado." }, { status: 503 });

async function handle(request: Request): Promise<Response> {
	const auth = getAuth();
	if (!auth) return unavailable();
	const handler = toNextJsHandler(auth);
	return request.method === "POST" ? handler.POST(request) : handler.GET(request);
}

export const GET = handle;
export const POST = handle;
