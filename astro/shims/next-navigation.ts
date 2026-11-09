export function usePathname(): string {
	return globalThis.window === undefined ? "/" : globalThis.window.location.pathname;
}
