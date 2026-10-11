import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SignOut } from "@/components/admin/auth-buttons";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
	const admin = await requireAdmin();

	return (
		<div className="container mx-auto px-4 py-8">
			<header className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
				<nav className="flex items-center gap-4 text-sm font-medium">
					<Link href="/admin" className="text-lg font-bold">
						Painel
					</Link>
					<Link href="/" className="hover:underline">
						Ver site
					</Link>
				</nav>
				<div className="flex items-center gap-3 text-sm">
					<span className="text-muted-foreground">{admin.email}</span>
					<SignOut />
				</div>
			</header>
			{children}
		</div>
	);
}
