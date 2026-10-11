import { adminRoute, readWriteBody, requireCategory } from "@/lib/admin/api";
import { listProducts, saveProduct } from "@/lib/admin/products";
import { getStore } from "@/lib/admin/store";

interface Context {
	params: Promise<{ category: string }>;
}

export function GET(_request: Request, { params }: Context): Promise<Response> {
	return adminRoute(async () => {
		const category = requireCategory((await params).category);
		return Response.json(await listProducts(getStore(), category));
	});
}

export function POST(request: Request, { params }: Context): Promise<Response> {
	return adminRoute(async (author) => {
		const category = requireCategory((await params).category);
		const { sha, product } = await readWriteBody(request);
		return Response.json(
			{ product: await saveProduct(getStore(), category, product, { sha, author }) },
			{ status: 201 },
		);
	});
}
