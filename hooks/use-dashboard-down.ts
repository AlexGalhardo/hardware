"use client";

import { useEffect, useState } from "react";
import { LINKS_DASHBOARD_URL } from "@/lib/affiliate-catalogue";
import { isDashboardUp } from "@/lib/affiliate-links";

// One health check per page load, shared by every card that renders store buttons.
let health: Promise<boolean> | undefined;

/**
 * True once the links dashboard failed its health check in this browser. Store buttons then link straight to
 * the store, so an outage costs the click count but never the sale.
 */
export function useDashboardDown(): boolean {
	const [down, setDown] = useState(false);
	useEffect(() => {
		let mounted = true;
		health ??= isDashboardUp(LINKS_DASHBOARD_URL);
		health.then((up) => {
			if (mounted) setDown(!up);
		});
		return () => {
			mounted = false;
		};
	}, []);
	return down;
}
