import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
	title: "Contato - TudoHardware",
	description: "Fale com o TudoHardware: relate um bug, tire uma dúvida ou envie uma sugestão.",
};

export default function ContatoPage() {
	return (
		<main className="min-h-screen bg-background">
			<div className="container px-4 py-8 mx-auto max-w-xl">
				<Link
					href="/"
					className="inline-flex items-center text-sm text-black dark:text-white hover:text-foreground mb-8"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Voltar
				</Link>

				<h1 className="text-3xl font-bold text-foreground mb-6 text-center">Contato</h1>

				<ContactForm />
			</div>
			<Footer />
		</main>
	);
}
