import { describe, expect, test } from "bun:test";
import { envProblems } from "./env";

describe("envProblems", () => {
	test("a well-formed environment has no problems, and an empty clone builds", () => {
		expect(envProblems({ LINKS_DASHBOARD_TOKEN: "k".repeat(64), UNRELATED: "x" })).toEqual([]);
		expect(envProblems({})).toEqual([]);
		expect(envProblems({ LINKS_DASHBOARD_TOKEN: "" })).toEqual([]);
	});

	test("a malformed value fails without echoing the value", () => {
		const problems = envProblems({ LINKS_DASHBOARD_TOKEN: "curta" });
		expect(problems).toHaveLength(1);
		expect(problems[0]?.startsWith("LINKS_DASHBOARD_TOKEN: valor inválido")).toBe(true);
		expect(problems[0]).not.toContain("curta");
	});
});
