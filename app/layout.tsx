import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Script from "next/script";
import CopyProtection from "@/components/CopyProtection";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import { orbitron } from "@/lib/fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://tudohardware.com"),
	title: "TudoHardware.com - Comparações Técnicas",
	description:
		"Compare smartphones, tablets, notebooks, CPUs, GPUs, geladeiras, tvs, drones, smartwatches, máquinas de lavar roupa e muito mais.",
	keywords: [
		"comparar celulares",
		"comparar smartphones",
		"qual notebook comprar",
		"melhor celular",
		"comparar notebooks",
		"ficha técnica",
		"especificações celular",
		"benchmark CPU",
		"benchmark GPU",
		"comparação processadores",
		"melhor placa video",
		"comparar GPUs",
		"comparar processadores",
		"qual GPU comprar",
		"melhor notebook",
		"comparar geladeiras",
		"melhor geladeira",
		"comparar lavadoras",
		"drone comparação",
		"smartwatch comparação",
		"melhor smartwatch",
		"comparar drones",
		"qual melhor",
		"vs comparação",
		"review técnico",
		"análise técnica",
		"custo benefício",
		"melhor desempenho",
		"especificações completas",
		"guia compra",
		"Hardware Brasil",
		"tecnologia comparação",
		"teste benchmark",
		"comparativo técnico",
	],
	authors: [{ name: "TudoHardware.com" }],
	icons: {
		icon: "/new-logo.webp",
	},
	openGraph: {
		title: "TudoHardware.com - Comparações Técnicas",
		description:
			"Compare smartphones, tablets, notebooks, CPUs, GPUs, geladeiras, tvs, drones, smartwatches, máquinas de lavar roupa e muito mais.",
		url: "https://tudohardware.com",
		siteName: "TudoHardware.com",
		images: [
			{
				url: "/new-logo.webp",
				width: 1200,
				height: 630,
				alt: "TudoHardware.com -  Seu Guia Sobre Tecnologia",
			},
		],
		locale: "pt-BR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "TudoHardware.com - Comparações Técnicas",
		description:
			"Compare smartphones, tablets, notebooks, CPUs, GPUs, geladeiras, tvs, drones, smartwatches, máquinas de lavar roupa e muito mais.",
		images: ["/new-logo.webp"],
	},
	alternates: {
		canonical: "https://tudohardware.com",
		languages: {
			"pt-BR": "https://tudohardware.com",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" className={orbitron.variable} suppressHydrationWarning>
			<body className={`${inter.className} font-sans antialiased min-h-screen bg-background`}>
				<GoogleAnalytics GA_MEASUREMENT_ID="G-G7P8NXJKX4" />
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<NavbarWrapper />
					<main>{children}</main>
					<Toaster />
					<CopyProtection />
				</ThemeProvider>

				<Script
					id="ms-clarity"
					strategy="afterInteractive"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: fixed analytics snippet, no user input reaches it
					dangerouslySetInnerHTML={{
						__html: `
							(function(c,l,a,r,i,t,y){
								c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
								t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
								y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
							})(window, document, "clarity", "script", "xm2gg2m5sc");
						`,
					}}
				/>
			</body>
		</html>
	);
}
