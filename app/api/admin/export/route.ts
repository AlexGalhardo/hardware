import { adminRoute } from "@/lib/admin/api";
import { catalogueToCsv } from "@/lib/affiliate-links";
import { buildCatalogue } from "@/scripts/catalogue";

/**
 * Every product of the deployed site with its store links, as a file the links dashboard imports
 * (Projetos -> "Importar JSON/CSV"): a bare JSON array, or a CSV with one row per link.
 */
export function GET(request: Request): Promise<Response> {
	return adminRoute(async () => {
		const format = new URL(request.url).searchParams.get("format") === "csv" ? "csv" : "json";
		const catalogue = await buildCatalogue();
		return new Response(format === "csv" ? catalogueToCsv(catalogue) : JSON.stringify(catalogue, null, "\t"), {
			headers: {
				"content-type": format === "csv" ? "text/csv; charset=utf-8" : "application/json; charset=utf-8",
				"content-disposition": `attachment; filename="tudohardware-products.${format}"`,
			},
		});
	});
}
