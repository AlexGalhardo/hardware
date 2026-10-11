// Where the admin reads and writes the data files. In production every save is a commit in the site's own
// repository (GitHub Contents API), which triggers a new deploy; without the token it writes to the local disk.
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface StoredFile {
	text: string;
	/** Git blob hash of the content: sent back on write so two editors cannot overwrite each other. */
	sha: string;
}

export interface DataStore {
	kind: "github" | "local";
	read(file: string): Promise<StoredFile>;
	write(file: string, text: string, message: string, sha: string): Promise<void>;
}

export class ConflictError extends Error {}
export class StoreError extends Error {}

export function blobSha(text: string): string {
	const body = Buffer.from(text, "utf8");
	return createHash("sha1").update(`blob ${body.length}\0`).update(body).digest("hex");
}

export function localStore(root: string): DataStore {
	const resolve = (file: string): string => path.join(root, file);
	return {
		kind: "local",
		async read(file) {
			const text = await readFile(resolve(file), "utf8");
			return { text, sha: blobSha(text) };
		},
		async write(file, text, _message, sha) {
			const current = await readFile(resolve(file), "utf8");
			if (blobSha(current) !== sha) throw new ConflictError("O arquivo mudou desde que foi aberto.");
			await writeFile(resolve(file), text, "utf8");
		},
	};
}

export interface GithubOptions {
	token: string;
	/** owner/name */
	repo: string;
	branch: string;
	fetch?: typeof fetch;
}

export function githubStore({ token, repo, branch, fetch: request = fetch }: GithubOptions): DataStore {
	const url = (file: string): string => `https://api.github.com/repos/${repo}/contents/${file}`;
	const headers = {
		authorization: `Bearer ${token}`,
		accept: "application/vnd.github+json",
		"x-github-api-version": "2022-11-28",
	};
	return {
		kind: "github",
		async read(file) {
			// The raw media type has no 1 MB limit, unlike the default JSON answer with base64 content.
			const response = await request(`${url(file)}?ref=${encodeURIComponent(branch)}`, {
				headers: { ...headers, accept: "application/vnd.github.raw+json" },
				cache: "no-store",
			});
			if (!response.ok) throw new StoreError(`GitHub respondeu ${response.status} ao ler ${file}.`);
			const text = await response.text();
			return { text, sha: blobSha(text) };
		},
		async write(file, text, message, sha) {
			const response = await request(url(file), {
				method: "PUT",
				headers: { ...headers, "content-type": "application/json" },
				body: JSON.stringify({ message, branch, sha, content: Buffer.from(text, "utf8").toString("base64") }),
			});
			if (response.status === 409 || response.status === 422)
				throw new ConflictError("O arquivo mudou desde que foi aberto.");
			if (!response.ok) throw new StoreError(`GitHub respondeu ${response.status} ao gravar ${file}.`);
		},
	};
}

/** GitHub when the repository token is configured; the working copy otherwise (development). */
export function getStore(): DataStore {
	const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH, VERCEL } = process.env;
	if (GITHUB_TOKEN && GITHUB_REPO)
		return githubStore({ token: GITHUB_TOKEN, repo: GITHUB_REPO, branch: GITHUB_BRANCH || "main" });
	if (VERCEL) throw new StoreError("Defina GITHUB_TOKEN e GITHUB_REPO para o painel gravar os produtos.");
	return localStore(process.env.DATA_ROOT || process.cwd());
}
