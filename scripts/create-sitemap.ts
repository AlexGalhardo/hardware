import fs from "node:fs";
import path from "node:path";

interface Product {
	id: string;
	name: string;
	brand: string;
	category: string;
}

interface SitemapUrl {
	loc: string;
	lastmod: string;
	changefreq: string;
	priority: string;
}

const staticUrls: SitemapUrl[] = [
	{
		loc: "https://tudohardware.com",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/sobre",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/politica-de-privacidade",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/termos-de-uso",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/contato",
		lastmod: "2026-10-17T12:00:00.000Z",
		changefreq: "monthly",
		priority: "0.5",
	},
	{
		loc: "https://tudohardware.com/cpus",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/smartphones",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/gpus",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/notebooks",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/tablets",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/geladeiras",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/drones",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/smartwatches",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/fones-de-ouvido",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/maquinas-lavar-roupas",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/smart-tvs",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/placa-mae",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/caixa-de-som",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/mouses",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/teclados",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/microondas",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/airfryers",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/cameras-de-seguranca",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/ar-condicionado",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/monitores",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/cameras",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/cafeteiras",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/impressoras",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
	{
		loc: "https://tudohardware.com/fechaduras",
		lastmod: "2025-08-09T12:00:00.000Z",
		changefreq: "monthly",
		priority: "1.0",
	},
];

const categoryFileMap: Record<string, string> = {
	cpus: "cpus.json",
	smartphones: "smartphones.json",
	gpus: "gpus.json",
	notebooks: "notebooks.json",
	tablets: "tablets.json",
	geladeiras: "geladeiras.json",
	drones: "drones.json",
	smartwatches: "smartwatches.json",
	"fones-de-ouvido": "fones-de-ouvido.json",
	"maquinas-lavar-roupas": "maquina-lavar-roupas.json",
	"smart-tvs": "smartvs.json",
	"placa-mae": "placas-mae.json",
	"caixa-de-som": "caixas-de-som.json",
	mouses: "mouses.json",
	teclados: "teclados.json",
	microondas: "microondas.json",
	airfryers: "airfryers.json",
	"cameras-de-seguranca": "cameras-de-seguranca.json",
	"ar-condicionado": "ar-condicionado.json",
	monitores: "monitores.json",
	cameras: "cameras.json",
	cafeteiras: "cafeteiras.json",
	impressoras: "impressoras.json",
	fechaduras: "fechaduras.json",
};

function generateSitemap(): void {
	const dataDir = path.join(process.cwd(), "data");
	const productUrls: SitemapUrl[] = [];

	Object.entries(categoryFileMap).forEach(([category, fileName]) => {
		const filePath = path.join(dataDir, fileName);

		if (!fs.existsSync(filePath)) {
			console.warn(`Warning: ${fileName} not found`);
			return;
		}

		const fileContent = fs.readFileSync(filePath, "utf-8");
		const products: Product[] = JSON.parse(fileContent);

		products.forEach((product) => {
			productUrls.push({
				loc: `https://tudohardware.com/${category}/${product.id}`,
				lastmod: "2025-08-09T12:00:00.000Z",
				changefreq: "monthly",
				priority: "0.8",
			});
		});
	});

	const allUrls = [...staticUrls, ...productUrls];

	const urlElements = allUrls
		.map(
			(url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
		)
		.join("\n\n");

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

${urlElements}

</urlset>`;

	const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
	fs.writeFileSync(outputPath, sitemap, "utf-8");

	console.log(`✅ Sitemap generated successfully!`);
	console.log(`📊 Total URLs: ${allUrls.length}`);
	console.log(`   - Static URLs: ${staticUrls.length}`);
	console.log(`   - Product URLs: ${productUrls.length}`);
	console.log(`📁 Location: ${outputPath}`);
}

generateSitemap();
