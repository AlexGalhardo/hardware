// Runs before every build: registers the whole catalogue in the links dashboard and fails the build when it
// cannot, so no page goes live with an affiliate link the dashboard does not know.
import { LINKS_DASHBOARD_URL, SITE_URL } from "../lib/affiliate-catalogue";
import { catalogueProblems, SyncError, syncCatalogue } from "../lib/affiliate-links";
import { buildCatalogue } from "./catalogue";

async function main(): Promise<number> {
	const products = await buildCatalogue();
	const problems = catalogueProblems(products);
	if (problems.length) {
		console.error(`Catálogo inválido (${problems.length}):\n- ${problems.join("\n- ")}`);
		return 1;
	}

	const token = process.env.LINKS_DASHBOARD_TOKEN;
	if (!token) {
		console.warn(`LINKS_DASHBOARD_TOKEN não definido: ${products.length} produtos validados, nada enviado.`);
		return 0;
	}

	try {
		const summary = await syncCatalogue({ dashboardUrl: LINKS_DASHBOARD_URL, siteUrl: SITE_URL, token, products });
		console.log(
			`Links sincronizados com ${LINKS_DASHBOARD_URL}: ${products.length} produtos ` +
				`(${summary.productsCreated} novos, ${summary.productsUpdated} atualizados, ${summary.productsRemoved} removidos; ` +
				`links +${summary.linksAdded} -${summary.linksRemoved}).`,
		);
		return 0;
	} catch (error) {
		if (!(error instanceof SyncError)) throw error;
		console.error(error.message);
		return 1;
	}
}

main().then((code) => process.exit(code));
