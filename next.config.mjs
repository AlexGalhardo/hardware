/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
	},
	async headers() {
		// The admin panel and the API must never be indexed or cached by a shared cache.
		const noIndex = [
			{ key: "X-Robots-Tag", value: "noindex, nofollow" },
			{ key: "Cache-Control", value: "no-store" },
		];
		return [
			{ source: "/admin/:path*", headers: noIndex },
			{ source: "/api/:path*", headers: noIndex },
		];
	},
};

export default nextConfig;
