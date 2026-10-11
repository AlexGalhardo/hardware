import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	title: "Política de Privacidade - TudoHardware",
	description: "Leia mais sobre nossa política de privacidade no TudoHardware",
};

export default function PrivacidadePage() {
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

				<h1 className="text-3xl font-bold text-foreground mb-2">Política de Privacidade</h1>
				<p className="text-sm text-black dark:text-white mb-8">Última atualização: Janeiro de 2026</p>

				<div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
					<section>
						<h2 className="text-xl font-semibold mb-3">1. Introdução</h2>
						<p className="text-black dark:text-white">
							O <strong>TudoHardware</strong> ("nós", "nosso" ou "site") está comprometido em proteger
							sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos
							suas informações quando você visita nosso site.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">2. Informações que Coletamos</h2>
						<p className="text-black dark:text-white mb-3">
							Podemos coletar os seguintes tipos de informações:
						</p>
						<ul className="list-disc list-inside text-black dark:text-white space-y-2">
							<li>Informações de uso do site (páginas visitadas, tempo de permanência)</li>
							<li>Informações do dispositivo (tipo de navegador, sistema operacional)</li>
							<li>Dados de formulários de contato (nome, email, mensagem)</li>
							<li>Cookies e tecnologias similares</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">3. Como Usamos suas Informações</h2>
						<p className="text-black dark:text-white mb-3">Utilizamos as informações coletadas para:</p>
						<ul className="list-disc list-inside text-black dark:text-white space-y-2">
							<li>Melhorar a experiência do usuário no site</li>
							<li>Responder a mensagens de contato</li>
							<li>Analisar o uso do site para melhorias</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">4. Compartilhamento de Informações</h2>
						<p className="text-black dark:text-white">
							Não vendemos suas informações pessoais. Podemos compartilhar dados anônimos e agregados com
							parceiros para fins de análise. Links de afiliados em nosso site podem direcionar você a
							sites de terceiros que possuem suas próprias políticas de privacidade.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
						<p className="text-black dark:text-white">
							Utilizamos cookies para melhorar sua experiência de navegação, lembrar suas preferências
							(como tema claro/escuro) e coletar dados anônimos de uso. Você pode configurar seu navegador
							para recusar cookies, mas isso pode afetar a funcionalidade do site.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">6. Contato</h2>
						<p className="text-black dark:text-white">
							Se você tiver duvidas sobre esta Politica de Privacidade, entre em contato conosco através
							da nossa{" "}
							<Link href="/contato" className="text-primary hover:underline">
								página de contato
							</Link>
							.
						</p>
					</section>
				</div>
			</div>

			<Footer />
		</main>
	);
}
