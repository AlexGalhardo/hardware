import type { ProductCategory } from "../types";
import { type AdminUser, getAdmin } from "./auth";
import { isCategory } from "./category-files";
import { NotFoundError, ValidationError } from "./products";
import { ConflictError, StoreError } from "./store";

class HttpError extends Error {
	constructor(
		public readonly status: number,
		message: string,
	) {
		super(message);
	}
}

const fail = (status: number, error: string, details?: string[]): Response =>
	Response.json({ error, ...(details ? { details } : {}) }, { status });

/** Runs an admin handler: refuses anyone who is not a signed-in admin and maps known failures to a status. */
export async function adminRoute(run: (admin: AdminUser) => Promise<Response>): Promise<Response> {
	try {
		const admin = await getAdmin();
		if (!admin) return fail(401, "Faça login como administrador.");
		return await run(admin);
	} catch (error) {
		if (error instanceof HttpError) return fail(error.status, error.message);
		if (error instanceof ValidationError) return fail(400, "Produto inválido.", error.issues);
		if (error instanceof NotFoundError) return fail(404, error.message);
		if (error instanceof ConflictError)
			return fail(409, `${error.message} Recarregue a página e refaça a alteração.`);
		if (error instanceof StoreError) return fail(502, error.message);
		if (error instanceof SyntaxError) return fail(400, "JSON inválido.");
		console.error("[admin] unexpected error", error);
		return fail(500, "Erro inesperado.");
	}
}

export function requireCategory(value: string): ProductCategory {
	if (!isCategory(value)) throw new HttpError(404, `Categoria ${value} não existe.`);
	return value;
}

export interface WriteBody {
	sha: string;
	product?: unknown;
}

export async function readWriteBody(request: Request): Promise<WriteBody> {
	const body = (await request.json()) as Partial<WriteBody> | null;
	if (!body || typeof body.sha !== "string" || !body.sha) throw new HttpError(400, "Falta o campo sha.");
	return { sha: body.sha, product: body.product };
}
