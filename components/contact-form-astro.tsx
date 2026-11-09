"use client";

import { ContactForm, type SubmitContact } from "@/app/contato/contact-form";

// Astro islands cannot receive functions as props, so the submit handler lives here.
const submit: SubmitContact = async (_previous, form) => {
	try {
		const response = await fetch("/api/contato", { method: "POST", body: form });
		return await response.json();
	} catch {
		return { ok: false, error: "Não foi possível enviar a mensagem. Tente novamente." };
	}
};

export function ContactFormAstro() {
	return <ContactForm submit={submit} />;
}
