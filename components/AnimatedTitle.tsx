import { useEffect, useState } from "react";

const PHRASES = [
	{ text: "Quais Produtos Você Quer Comparar Hoje?", gradient: "from-red-600 to-black" },
	{ text: "Selecione. Escolha. Compare.", gradient: "from-green-600 to-black" },
	{ text: "Simples, Fácil e Rápido", gradient: "from-blue-600 to-black" },
	{ text: "Compare Diversos Hardwares Sem Complicação", gradient: "from-orange-600 to-black" },
	{ text: "Escolha A Melhor Opção Para Comprar", gradient: "from-purple-600 to-black" },
];

export default function TypingTitle() {
	const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
	const [displayedText, setDisplayedText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [charIndex, setCharIndex] = useState(0);

	useEffect(() => {
		const currentPhrase = PHRASES[currentPhraseIndex].text;

		const typingSpeed = isDeleting ? 30 : 50;
		const pauseAfterComplete = 2000;
		const pauseAfterDelete = 500;

		if (!isDeleting && charIndex < currentPhrase.length) {
			const timer = setTimeout(() => {
				setDisplayedText(currentPhrase.slice(0, charIndex + 1));
				setCharIndex(charIndex + 1);
			}, typingSpeed);
			return () => clearTimeout(timer);
		} else if (!isDeleting && charIndex === currentPhrase.length) {
			const timer = setTimeout(() => {
				setIsDeleting(true);
			}, pauseAfterComplete);
			return () => clearTimeout(timer);
		} else if (isDeleting && charIndex > 0) {
			const timer = setTimeout(() => {
				setDisplayedText(currentPhrase.slice(0, charIndex - 1));
				setCharIndex(charIndex - 1);
			}, typingSpeed);
			return () => clearTimeout(timer);
		} else if (isDeleting && charIndex === 0) {
			const timer = setTimeout(() => {
				setIsDeleting(false);
				setCurrentPhraseIndex((currentPhraseIndex + 1) % PHRASES.length);
			}, pauseAfterDelete);
			return () => clearTimeout(timer);
		}
	}, [charIndex, isDeleting, currentPhraseIndex]);

	return (
		<div className="text-center mb-12">
			<h1
				className={`text-2xl md:text-3xl font-bold mb-2 text-balance bg-gradient-to-r ${PHRASES[currentPhraseIndex].gradient} bg-clip-text text-transparent min-h-[4rem] flex items-center justify-center dark:text-white`}
			>
				<span>
					{displayedText}
					<span className="animate-pulse">|</span>
				</span>
			</h1>
		</div>
	);
}
