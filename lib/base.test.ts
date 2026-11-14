import { describe, expect, test } from "bun:test";
import { stripBase, withBase } from "./base";

// Bun has no Vite env, so the base is "/" here: the helpers must be transparent.
describe("base helpers without a base", () => {
	test("withBase keeps absolute paths", () => {
		expect(withBase("/cpus")).toBe("/cpus");
		expect(withBase("cpus")).toBe("/cpus");
		expect(withBase("/")).toBe("/");
	});

	test("stripBase leaves the pathname alone", () => {
		expect(stripBase("/cpus/x")).toBe("/cpus/x");
	});
});
