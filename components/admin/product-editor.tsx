"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { StoredProduct } from "@/lib/admin/products";

/** Fields with their own input. Everything else is the category's spec sheet, edited as JSON. */
const BASE_FIELDS = ["id", "brand", "name", "image", "mercadolivreUrl", "amazonUrl", "shopeeUrl", "category"] as const;

interface ProductEditorProps {
	category: string;
	/** Hash of the data file when the page was rendered: the server refuses the save if the file changed. */
	sha: string;
	product?: StoredProduct;
	/** Another product of the category: a new product starts from its spec fields, emptied. */
	template?: StoredProduct;
}

function specsOf(product: StoredProduct | undefined, blank: boolean): Record<string, unknown> {
	const specs: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(product ?? {})) {
		if ((BASE_FIELDS as readonly string[]).includes(key)) continue;
		specs[key] = blank ? null : value;
	}
	return specs;
}

const text = (value: unknown): string => (typeof value === "string" ? value : "");

export function ProductEditor({ category, sha, product, template }: ProductEditorProps) {
	const router = useRouter();
	const [specs, setSpecs] = useState(() => JSON.stringify(specsOf(product ?? template, !product), null, 2));
	const [errors, setErrors] = useState<string[]>([]);
	const [pending, setPending] = useState(false);

	async function send(method: "POST" | "PUT" | "DELETE", body: object): Promise<boolean> {
		setPending(true);
		setErrors([]);
		const target = product ? `/api/admin/products/${category}/${product.id}` : `/api/admin/products/${category}`;
		try {
			const response = await fetch(target, {
				method,
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ sha, ...body }),
			});
			if (response.ok) return true;
			const failure = (await response.json().catch(() => ({}))) as { error?: string; details?: string[] };
			setErrors([failure.error ?? `Erro ${response.status}`, ...(failure.details ?? [])]);
		} catch {
			setErrors(["Sem resposta do servidor."]);
		}
		setPending(false);
		return false;
	}

	async function save(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		let sheet: unknown;
		try {
			sheet = JSON.parse(specs);
		} catch {
			setErrors(["A ficha técnica não é um JSON válido."]);
			return;
		}
		if (typeof sheet !== "object" || sheet === null || Array.isArray(sheet)) {
			setErrors(["A ficha técnica precisa ser um objeto JSON."]);
			return;
		}
		const base = Object.fromEntries(
			BASE_FIELDS.filter((key) => key !== "category").map((key) => [key, form.get(key)]),
		);
		if (await send(product ? "PUT" : "POST", { product: { ...sheet, ...base } })) {
			router.push(`/admin/${category}`);
			router.refresh();
		}
	}

	async function remove() {
		if (!product || !globalThis.confirm(`Excluir ${product.brand} ${product.name}? A página do produto sai do ar.`))
			return;
		if (await send("DELETE", {})) {
			router.push(`/admin/${category}`);
			router.refresh();
		}
	}

	return (
		<form onSubmit={save} className="mt-6 flex flex-col gap-4">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<Label htmlFor="brand">Marca</Label>
					<Input id="brand" name="brand" required defaultValue={text(product?.brand)} />
				</div>
				<div>
					<Label htmlFor="name">Nome</Label>
					<Input id="name" name="name" required defaultValue={text(product?.name)} />
				</div>
			</div>
			<div>
				<Label htmlFor="id">Id</Label>
				<Input
					id="id"
					name="id"
					required
					pattern="[a-z0-9]+([.\-][a-z0-9]+)*"
					defaultValue={text(product?.id)}
					aria-describedby="id-hint"
				/>
				<p id="id-hint" className="mt-1 text-xs text-muted-foreground">
					Faz parte do endereço da página (/{category}/id). Trocar o id de um produto existente muda o
					endereço e zera os cliques dele no dashboard de links.
				</p>
			</div>
			<div>
				<Label htmlFor="image">Imagem (endereço)</Label>
				<Input id="image" name="image" required defaultValue={text(product?.image)} />
			</div>
			<fieldset className="flex flex-col gap-3 rounded-lg border border-border p-4">
				<legend className="px-1 text-sm font-medium">Links de loja (ao menos um, https://)</legend>
				<div>
					<Label htmlFor="mercadolivreUrl">Mercado Livre</Label>
					<Input
						id="mercadolivreUrl"
						name="mercadolivreUrl"
						type="url"
						defaultValue={text(product?.mercadolivreUrl)}
					/>
				</div>
				<div>
					<Label htmlFor="amazonUrl">Amazon</Label>
					<Input id="amazonUrl" name="amazonUrl" type="url" defaultValue={text(product?.amazonUrl)} />
				</div>
				<div>
					<Label htmlFor="shopeeUrl">Shopee</Label>
					<Input id="shopeeUrl" name="shopeeUrl" type="url" defaultValue={text(product?.shopeeUrl)} />
				</div>
			</fieldset>
			<div>
				<Label htmlFor="specs">Ficha técnica (JSON)</Label>
				<Textarea
					id="specs"
					value={specs}
					onChange={(event) => setSpecs(event.target.value)}
					rows={18}
					spellCheck={false}
					className="font-mono text-xs"
				/>
			</div>

			{errors.length > 0 && (
				<ul role="alert" className="list-disc pl-5 text-sm text-red-600">
					{errors.map((error) => (
						<li key={error}>{error}</li>
					))}
				</ul>
			)}

			<div className="flex flex-wrap items-center justify-between gap-3">
				<Button type="submit" disabled={pending}>
					{pending ? "Salvando…" : "Salvar"}
				</Button>
				{product && (
					<Button type="button" variant="destructive" onClick={remove} disabled={pending}>
						Excluir produto
					</Button>
				)}
			</div>
		</form>
	);
}
