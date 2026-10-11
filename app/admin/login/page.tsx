import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GoogleSignIn } from "@/components/admin/auth-buttons";
import { getAdmin, missingAuthConfig } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Admin - Login", robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
	if (await getAdmin()) redirect("/admin");
	const missing = missingAuthConfig();
	const { erro } = await searchParams;

	return (
		<main className="container mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center gap-4 px-4 py-12">
			<h1 className="text-2xl font-bold">Painel</h1>
			{missing.length > 0 ? (
				<p role="alert" className="text-sm text-red-600">
					Login indisponível. Variáveis de ambiente ausentes: {missing.join(", ")}.
				</p>
			) : (
				<>
					<p className="text-sm text-muted-foreground">Acesso restrito aos e-mails autorizados.</p>
					{erro === "acesso" && (
						<p role="alert" className="text-sm text-red-600">
							Essa conta do Google não tem acesso ao painel.
						</p>
					)}
					<GoogleSignIn />
				</>
			)}
		</main>
	);
}
