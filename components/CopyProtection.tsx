"use client";

import { useEffect } from "react";

const BLOCKED = ["copy", "cut", "contextmenu", "dragstart", "selectstart"] as const;

// Form fields stay usable (people need to select and paste in the contact form) and the admin panel is left alone.
function allowed(target: EventTarget | null): boolean {
	if (location.pathname.startsWith("/admin")) return true;
	return target instanceof Element && target.closest("input, textarea, select, [contenteditable='true']") !== null;
}

// ponytail: deters casual copying only; the text is still in the HTML (view-source, devtools, reader mode).
export default function CopyProtection() {
	useEffect(() => {
		const prevent = (event: Event) => {
			if (!allowed(event.target)) event.preventDefault();
		};
		for (const type of BLOCKED) document.addEventListener(type, prevent);
		return () => {
			for (const type of BLOCKED) document.removeEventListener(type, prevent);
		};
	}, []);

	return null;
}
