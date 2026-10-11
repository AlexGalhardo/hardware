import Link from "next/link";
import { ArrowLeft, Target, Users, Zap, Heart } from "lucide-react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	title: "Sobre - TudoHardware.com",
	description: "Conheça o TudoHardware.com, sua plataforma de comparações para uma decisão de comprabem embasada.",
};

export default function SobrePage() {
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

				<h1 className="text-3xl font-bold text-foreground mb-6 text-center">Sobre</h1>

				<div className="prose prose-neutral dark:prose-invert max-w-none">
					<p className="text-lg text-black dark:text-white mb-8">
						O <strong>TudoHardware.com</strong> é a sua plataforma completa para comparar especificações
						técnicas de hardware e produtos físicos. Nossa missão é ajudar você a tomar decisões mais
						precisas e embasadas na hora de fazer suas próximas compras.
					</p>

					<p className="text-lg text-black dark:text-white mb-8">
						Nossas tecnologias pegam dados de fontes oficiais, marketplaces e outros sites confiáveis para
						trazer as informações mais precisas e atualizadas sobre uma ampla variedade de produtos e
						categorias.
						<br />
						<br />
						Sempre estamos atualizando nosso banco de dados, adicionando novos produtos e garantindo que as
						informações sempre estejam corretas.
						<br />
						<br />
						Caso você encontre algum informação incorreta ou desatualizada, por favor, entre em contato
						conosco para que possamos corrigir o mais rápido possível.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
						<div className="p-6 border border-border rounded-xl">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
								<Target className="h-6 w-6" />
							</div>
							<h3 className="text-lg font-semibold mb-2">Nossa Missão</h3>
							<p className="text-black dark:text-white text-sm">
								Simplificar a comparação de hardware, oferecendo informações precisas e atualizadas para
								que você encontre o produto perfeito para suas necessidades.
							</p>
						</div>

						<div className="p-6 border border-border rounded-xl">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
								<Users className="h-6 w-6" />
							</div>
							<h3 className="text-lg font-semibold mb-2">Para Quem</h3>
							<p className="text-black dark:text-white text-sm">
								Desde entusiastas de tecnologia até consumidores em busca do melhor custo-benefício,
								nosso site atende a todos que querem fazer escolhas inteligentes.
							</p>
						</div>

						<div className="p-6 border border-border rounded-xl">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
								<Zap className="h-6 w-6" />
							</div>
							<h3 className="text-lg font-semibold mb-2">Como Funciona</h3>
							<p className="text-black dark:text-white text-sm">
								Selecione uma categoria, escolha até 4 produtos e compare suas especificações técnicas
								lado a lado. Simples, fácil e rápido.
							</p>
						</div>

						<div className="p-6 border border-border rounded-xl">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
								<Heart className="h-6 w-6" />
							</div>
							<h3 className="text-lg font-semibold mb-2">Nossos Valores</h3>
							<p className="text-black dark:text-white text-sm">
								Transparência, precisão e foco no usuário. Trabalhamos para oferecer a melhor
								experiência de comparação de produtos.
							</p>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}
