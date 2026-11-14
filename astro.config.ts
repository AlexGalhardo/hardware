import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const root = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages serves the site under /tudohardware; the Docker image builds with BASE_PATH=/.
export default defineConfig({
	site: "https://alexgalhardo.github.io",
	base: process.env.BASE_PATH || "/tudohardware",
	output: "static",
	srcDir: "./astro",
	trailingSlash: "never",
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": root,
			},
		},
	},
});
