import { type NextRequest, NextResponse } from "next/server";
import { isCategory } from "@/lib/admin/category-files";
import { isScriptClient } from "@/lib/scrapers";

const FIXED_PAGES = new Set(["sobre", "termos-de-uso", "politica-de-privacidade", "contato", "admin", "api"]);

// An address that is not a page goes to the home page. /<segment> is decided here because app/[category]
// streams its answer and would otherwise serve the not-found screen with a 200. Unknown products under a real
// category are sent home by app/not-found.tsx.
export default function proxy(request: NextRequest) {
	if (isScriptClient(request.headers.get("user-agent"))) return new NextResponse(null, { status: 403 });
	const [, first, second] = request.nextUrl.pathname.split("/");
	// Files (robots.txt, sitemap.xml, images) are not pages.
	if (!first || second !== undefined || first.includes(".")) return;
	if (isCategory(first) || FIXED_PAGES.has(first)) return;
	return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
	matcher: ["/((?!_next/).*)"],
};
