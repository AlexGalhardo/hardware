// The site is served under a sub-path on GitHub Pages (BASE_PATH) and at the root in Docker.
// Astro exposes the configured base as import.meta.env.BASE_URL; it is undefined outside Vite (bun test).
const base = (import.meta.env?.BASE_URL ?? "/").replace(/\/$/, "");

/** Prefixes an absolute site path ("/sobre") with the configured base. */
export function withBase(path: string): string {
	return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Removes the configured base from a pathname ("/tudohardware/cpus" becomes "/cpus"). */
export function stripBase(pathname: string): string {
	if (base && (pathname === base || pathname.startsWith(`${base}/`))) return pathname.slice(base.length) || "/";
	return pathname;
}
