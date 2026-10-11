import CookieBanner from "./CookieBanner";

export default function Footer() {
	return (
		<footer className="mt-3 mb-6">
			<CookieBanner />

			<div className="container px-4 mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
				<p className="text-sm text-black dark:text-white">&copy; 2026 TudoHardware</p>
				<div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-6">
					<a
						href="/sobre"
						className="text-sm text-black dark:text-white hover:text-blue-500 hover:underline transition-all"
					>
						Sobre
					</a>

					<a
						href="/politica-de-privacidade"
						className="text-sm text-black dark:text-white hover:text-blue-500 hover:underline transition-all"
					>
						Politica de Privacidade
					</a>

					<a
						href="/termos-de-uso"
						className="text-sm text-black dark:text-white hover:text-blue-500 hover:underline transition-all"
					>
						Termos de Uso
					</a>
				</div>
			</div>
		</footer>
	);
}
