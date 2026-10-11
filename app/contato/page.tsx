"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

type ContactType = "message" | "suggestion" | "error" | "product";

export default function ContatoPage() {
	const [contactType, setContactType] = useState<ContactType>("message");

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [errors, setErrors] = useState({
		name: false,
		email: false,
		message: false,
	});

	const [loading, setLoading] = useState(false);

	const contactTypeLabels: Record<ContactType, { title: string; description: string }> = {
		message: {
			title: "Encontrei Um Erro",
			description: "Encontrei um erro ou informação desatualizada no site",
		},
		suggestion: {
			title: "Sugerir Mudanças",
			description: "Quero sugerir melhorias para o site ou banco de dados",
		},
		error: {
			title: "Adicionar Produto",
			description: "Gostaria de sugerir uma adição de produto",
		},
		product: {
			title: "Feedback & Sugestões",
			description: "Gostaria de dar um feedback ou sugestão para o site",
		},
	};

	const resetForm = () => {
		setFormData({
			name: "",
			email: "",
			message: "",
		});

		setErrors({
			name: false,
			email: false,
			message: false,
		});

		setContactType("message");
	};

	const validateForm = () => {
		const newErrors = {
			name: formData.name.trim() === "",
			email: !/^\S+@\S+\.\S+$/.test(formData.email),
			message: formData.message.length < 32,
		};

		setErrors(newErrors);

		return !Object.values(newErrors).some(Boolean);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: false }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setLoading(true);

		try {
			const response = await fetch("/api/send-contact-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					subject: contactTypeLabels[contactType].description,
					message: formData.message,
					contactType,
				}),
			});

			const res = await response.json();

			if (res.success) {
				resetForm();

				toast({
					title: "Mensagem enviada!",
					description: "Entraremos em contato o mais breve possível.",
					variant: "success",
				});
			} else {
				toast({
					title: "Erro ao enviar mensagem",
					description: "Tente novamente mais tarde",
					variant: "error",
				});
			}
		} catch {
			toast({
				title: "Erro ao enviar email",
				description: "Tente novamente mais tarde",
				variant: "error",
			});
		} finally {
			setLoading(false);
		}
	};

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

				<h1 className="text-3xl font-bold text-foreground mb-8 text-center">Contato</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-3">
						<RadioGroup
							value={contactType}
							onValueChange={(value) => setContactType(value as ContactType)}
							className="grid grid-cols-1 sm:grid-cols-2 gap-3"
						>
							{(Object.keys(contactTypeLabels) as ContactType[]).map((type) => (
								<div key={type}>
									<RadioGroupItem value={type} id={type} className="peer sr-only" />
									<Label
										htmlFor={type}
										className="flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
									>
										<span className="font-medium">{contactTypeLabels[type].title}</span>
									</Label>
								</div>
							))}
						</RadioGroup>
					</div>

					<div className="space-y-2">
						<Label htmlFor="name">Nome</Label>
						<Input
							id="name"
							name="name"
							type="text"
							placeholder="Seu nome"
							value={formData.name}
							onChange={handleChange}
							className={errors.name ? "border-red-500" : ""}
							required
						/>
						{errors.name && <p className="text-red-500 text-sm">Nome é obrigatório</p>}
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="seu@email.com"
							value={formData.email}
							onChange={handleChange}
							className={errors.email ? "border-red-500" : ""}
							required
						/>
						{errors.email && <p className="text-red-500 text-sm">Email inválido</p>}
					</div>

					<div className="space-y-2">
						<Label htmlFor="subject">Assunto</Label>
						<Input
							id="subject"
							type="text"
							value={contactTypeLabels[contactType].description}
							disabled
							className="bg-muted cursor-not-allowed"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="message">Mensagem</Label>
						<Textarea
							id="message"
							name="message"
							placeholder="Digite sua mensagem"
							rows={15}
							minLength={32}
							maxLength={1024}
							value={formData.message}
							onChange={handleChange}
							className={errors.message ? "border-red-500" : ""}
							required
						/>
						{errors.message && (
							<p className="text-red-500 text-sm">A mensagem deve ter pelo menos 32 caracteres</p>
						)}
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						<Send className="mr-2 h-4 w-4" />
						{loading ? "Enviando..." : "Enviar mensagem"}
					</Button>
				</form>
			</div>

			<Footer />
		</main>
	);
}
