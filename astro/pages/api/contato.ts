import type { APIRoute } from "astro";
import { sendContact } from "@/lib/contact";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const form = await request.formData();
	const result = await sendContact(Object.fromEntries(form), process.env);
	return Response.json(result, { status: result.ok ? 200 : 400 });
};
