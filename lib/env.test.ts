import { describe, expect, test } from "bun:test";
import { ESSENTIAL, envProblems } from "./env";

const valid = {
	LINKS_DASHBOARD_TOKEN: "k".repeat(64),
	BETTER_AUTH_SECRET: "s".repeat(44),
	BETTER_AUTH_URL: "https://alexgalhardo.github.io/tudohardware",
	GOOGLE_CLIENT_ID: "123456789-abcdef.apps.googleusercontent.com",
	GOOGLE_CLIENT_SECRET: `GOCSPX-${"a".repeat(28)}`,
	ADMIN_EMAILS: "dono@example.com, outro@example.com",
	GITHUB_TOKEN: "github_pat_11ABCDEFG0abcdefghij_klmnopqrstuvwxyz",
	GITHUB_REPO: "dono/site",
};

describe("envProblems", () => {
	test("a complete, well-formed production environment has no problems", () => {
		expect(envProblems(valid, true)).toEqual([]);
		expect(envProblems({ ...valid, GITHUB_BRANCH: "main", UNRELATED: "x" }, true)).toEqual([]);
	});

	test("nothing is required outside production: a clone with no env builds", () => {
		expect(envProblems({}, false)).toEqual([]);
		expect(envProblems(Object.fromEntries(ESSENTIAL.map((name) => [name, ""])), false)).toEqual([]);
	});

	test("production names every essential variable that is missing or empty", () => {
		expect(envProblems({}, true)).toEqual(
			ESSENTIAL.map((name) => `${name}: obrigatória em produção e não definida`),
		);
		const { GITHUB_TOKEN: _token, ...rest } = valid;
		expect(envProblems({ ...rest, ADMIN_EMAILS: "" }, true)).toEqual([
			"ADMIN_EMAILS: obrigatória em produção e não definida",
			"GITHUB_TOKEN: obrigatória em produção e não definida",
		]);
	});

	test("a malformed value fails everywhere, production or not, without echoing the value", () => {
		const glued = `${valid.GOOGLE_CLIENT_SECRET}BETTER_AUTH_SECRET=${"x".repeat(44)}`;
		const cases: [string, string][] = [
			["GOOGLE_CLIENT_SECRET", glued],
			["GOOGLE_CLIENT_ID", "not-a-client-id"],
			["BETTER_AUTH_SECRET", "short"],
			["BETTER_AUTH_URL", "tudohardware"],
			["ADMIN_EMAILS", "dono@example.com, sem-arroba"],
			["GITHUB_REPO", "so-o-nome"],
			["GITHUB_TOKEN", "abc"],
			["LINKS_DASHBOARD_TOKEN", "curta"],
		];
		for (const [name, value] of cases) {
			for (const production of [false, true]) {
				const problems = envProblems({ ...valid, [name]: value }, production);
				expect(problems).toHaveLength(1);
				expect(problems[0]?.startsWith(`${name}: valor inválido`)).toBe(true);
				expect(problems[0]).not.toContain(value);
			}
		}
	});
});
