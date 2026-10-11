"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function GoogleSignIn() {
	const [error, setError] = useState("");
	const [pending, setPending] = useState(false);

	async function signIn() {
		setPending(true);
		setError("");
		try {
			const response = await fetch("/api/auth/sign-in/social", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ provider: "google", callbackURL: "/admin" }),
			});
			const body = (await response.json()) as { url?: string };
			if (!response.ok || !body.url) throw new Error("sign-in refused");
			globalThis.location.assign(body.url);
		} catch {
			setError("Não foi possível iniciar o login com o Google.");
			setPending(false);
		}
	}

	return (
		<div className="flex flex-col gap-3">
			<Button type="button" onClick={signIn} disabled={pending}>
				{pending ? "Abrindo o Google…" : "Entrar com Google"}
			</Button>
			{error && (
				<p role="alert" className="text-sm text-red-600">
					{error}
				</p>
			)}
		</div>
	);
}

export function SignOut() {
	async function signOut() {
		// better-auth answers 415 to a sign-out without a JSON body, and the session would stay open.
		await fetch("/api/auth/sign-out", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: "{}",
		});
		globalThis.location.assign("/admin/login");
	}
	return (
		<Button type="button" variant="outline" size="sm" onClick={signOut}>
			Sair
		</Button>
	);
}
