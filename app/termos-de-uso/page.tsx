import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	title: "Termos de Uso - TudoHardware",
	description: "Termos de uso do TudoHardware",
};

export default function TermosPage() {
	return (
		<main className="min-h-screen bg-background">
			<div className="container px-4 py-8 mx-auto max-w-3xl">
				<Link
					href="/"
					className="inline-flex items-center text-sm text-black dark:text-white hover:text-foreground mb-8"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Voltar
				</Link>

				<h1 className="text-3xl font-bold text-foreground mb-2">Termos de Uso</h1>
				<p className="text-sm text-black dark:text-white mb-8">Ultima atualização: Janeiro de 2026</p>

				<div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
					<section>
						<h2 className="text-xl font-semibold mb-3">1. Aceitação dos Termos</h2>
						<p className="text-black dark:text-white">
							Ao acessar e usar o TudoHardware, você concorda em cumprir estes Termos de Uso.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">2. Uso do Site</h2>
						<p className="text-black dark:text-white mb-3">
							Somos uma plataforma de comparação de especificações técnicas de hardware. Você concorda em
							usar o site para:
						</p>
						<ul className="list-disc list-inside text-black dark:text-white space-y-2">
							<li>Comparar produtos de hardware e obter informações detalhadas</li>
							<li>Obter informações sobre especificações tecnicas</li>
							<li>Acessar links de afiliados quando interessado por um produto</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">3. Links de Afiliados</h2>
						<p className="text-black dark:text-white">
							Nosso site contêm links de afiliados para lojas parceiras como Amazon e Mercado Livre.
							Quando você clica nesses links e realiza uma compra, recebemos uma pequena comissão pela
							venda. Isso não afeta o preço que você paga pelo produto. Essas comissões ajudam a manter o
							site operacional e a continuar fornecendo conteúdo gratuito. Obrigado!
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">4. Propriedade Intelectual</h2>
						<p className="text-black dark:text-white">
							Todo o conteúdo do site foi retirado de fontes oficiais e revendedores autorizados. Não nos
							responsabilizamos por qualquer violação de direitos autorais ou propriedade intelectual
							decorrente do uso indevido das informações fornecidas.
						</p>
					</section>
				</div>
			</div>

			<Footer />
		</main>
	);
}
