import { adminRoute, readWriteBody, requireCategory } from "@/lib/admin/api";
import { deleteProduct, saveProduct } from "@/lib/admin/products";
import { getStore } from "@/lib/admin/store";

interface Context {
	params: Promise<{ category: string; productId: string }>;
}

export function PUT(request: Request, { params }: Context): Promise<Response> {
	return adminRoute(async (author) => {
		const { category, productId } = await params;
		const { sha, product } = await readWriteBody(request);
		const saved = await saveProduct(getStore(), requireCategory(category), product, {
			originalId: productId,
			sha,
			author,
		});
		return Response.json({ product: saved });
	});
}

export function DELETE(request: Request, { params }: Context): Promise<Response> {
	return adminRoute(async (author) => {
		const { category, productId } = await params;
		const { sha } = await readWriteBody(request);
		await deleteProduct(getStore(), requireCategory(category), productId, { sha, author });
		return Response.json({ ok: true });
	});
}
