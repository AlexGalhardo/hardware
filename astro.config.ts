import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	site: "https://alexgalhardo.github.io/tudohardware",
	output: "static",
	// Not `src`: Next 16 refuses an `app` directory next to a `src/pages` one. Plan 003 renames it.
	srcDir: "./astro",
	trailingSlash: "never",
	adapter: vercel(),
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": root,
				// Spike only: the components still import Next primitives. Plan 002 replaces them.
				"next/link": path.join(root, "astro/shims/next-link.tsx"),
				"next/image": path.join(root, "astro/shims/next-image.tsx"),
				"next/navigation": path.join(root, "astro/shims/next-navigation.ts"),
			},
		},
	},
});
