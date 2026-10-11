import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

interface Product {
  name?: string;
  brand?: string;
  detailedModel?: string;
  [key: string]: unknown;
  image?: string;
}

interface CategoryProduct {
  name: string;
  brand: string;
  detailedModel: string;
  [key: string]: unknown;
  image: string;
}

interface Stats {
  totalProducts: number;
  totalProductsPerCategory: Record<string, number>;
  categories: Record<string, CategoryProduct[]>;
}

const dataPath = join(process.cwd(), "data");
const outputPath = join(process.cwd(), "data-stats.json");

const files = readdirSync(dataPath).filter((file) => file.endsWith(".json"));

const stats: Stats = {
  totalProducts: 0,
  totalProductsPerCategory: {},
  categories: {},
};

files.forEach((file) => {
  const filePath = join(dataPath, file);
  const categoryName = file.replace(".json", "");
  const rawData = readFileSync(filePath, "utf-8");
  const products: Product[] = JSON.parse(rawData);

  stats.totalProducts += products.length;
  stats.totalProductsPerCategory[categoryName] = products.length;

  stats.categories[categoryName] = products.map((product) => ({
    name: product.name || "",
    brand: product.brand || "",
    detailedModel: (product.detailedModel || product.model || "") as string,
    image: product.image || "",
  }));
});

writeFileSync(outputPath, JSON.stringify(stats, null, 2), "utf-8");

console.log(`Stats generated successfully at ${outputPath}`);
console.log(`Total products: ${stats.totalProducts}`);
console.log(`Total categories: ${Object.keys(stats.categories).length}`);
