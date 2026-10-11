// Regression test for setups/_common.sh: filling a variable must never corrupt the other lines of .env.
import { afterAll, describe, expect, test } from "bun:test";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const root = mkdtempSync(path.join(tmpdir(), "tudohardware-setup-"));
mkdirSync(path.join(root, "setups"));
cpSync(path.join(process.cwd(), "setups", "_common.sh"), path.join(root, "setups", "_common.sh"));
afterAll(() => rmSync(root, { recursive: true, force: true }));

/** Runs set_if_empty calls against a scratch .env and returns the file afterwards. */
function fill(env: string, ...assignments: [string, string][]): string {
	writeFileSync(path.join(root, ".env"), env);
	const calls = assignments.map(([name, value]) => `set_if_empty ${name} '${value}' >/dev/null`).join("; ");
	const result = Bun.spawnSync(["bash", "-c", `source setups/_common.sh; ROOT="$PWD"; ${calls}`], { cwd: root });
	if (result.exitCode !== 0) throw new Error(result.stderr.toString());
	return readFileSync(path.join(root, ".env"), "utf8");
}

describe("set_if_empty", () => {
	test("appends on its own line when the file does not end with a newline", () => {
		expect(fill("A=1\nGOOGLE_CLIENT_SECRET=GOCSPX-abc", ["BETTER_AUTH_SECRET", "s3cr3t"])).toBe(
			"A=1\nGOOGLE_CLIENT_SECRET=GOCSPX-abc\nBETTER_AUTH_SECRET=s3cr3t\n",
		);
	});

	test("fills an empty variable in place and never overwrites a value", () => {
		expect(fill("A=\nB=keep\n", ["A", "new"], ["B", "other"], ["A", "again"])).toBe("A=new\nB=keep\n");
	});

	test("running twice changes nothing the second time", () => {
		const once = fill("A=1", ["X", "v1"]);
		expect(fill(once, ["X", "v2"])).toBe(once);
	});
});
