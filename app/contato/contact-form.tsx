"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_TYPES, type ContactResult, capitalize } from "@/lib/contact";

export type SubmitContact = (previous: ContactResult | null, form: FormData) => Promise<ContactResult>;

export function ContactForm({ submit }: { submit: SubmitContact }) {
	const [state, action, pending] = useActionState(submit, null);

	if (state?.ok)
		return (
			<p role="status" className="text-center text-lg">
				Mensagem enviada. Obrigado pelo contato!
			</p>
		);

	return (
		<form action={action} className="space-y-5">
			<div className="space-y-2">
				<Label htmlFor="name">Nome</Label>
				<Input
					id="name"
					name="name"
					required
					minLength={4}
					maxLength={16}
					autoComplete="name"
					onChange={(event) => {
						event.target.value = capitalize(event.target.value);
					}}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="email">E-mail</Label>
				<Input
					id="email"
					name="email"
					type="email"
					required
					minLength={12}
					maxLength={48}
					autoComplete="email"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="type">Tipo de contato</Label>
				<select
					id="type"
					name="type"
					required
					defaultValue=""
					className="border-input dark:bg-input/30 h-9 w-full rounded-md border bg-transparent px-3 text-base md:text-sm"
				>
					<option value="" disabled>
						Selecione
					</option>
					{CONTACT_TYPES.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>

			<div className="space-y-2">
				<Label htmlFor="message">Mensagem</Label>
				<Textarea id="message" name="message" required minLength={32} maxLength={512} />
				<p className="text-xs text-muted-foreground">Entre 32 e 512 caracteres.</p>
			</div>

			<input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

			{state && !state.ok && (
				<p role="alert" className="text-sm text-destructive">
					{state.error}
				</p>
			)}

			<Button type="submit" disabled={pending} className="w-full">
				{pending ? "Enviando..." : "Enviar"}
			</Button>
		</form>
	);
}
