import { describe, expect, test } from "bun:test";
import { sendContact } from "./contact";

const env = { TELEGRAM_BOT_TOKEN: "123:abc", TELEGRAM_CHAT_ID: "42" };
const valid = { name: "Ana", email: "ana@example.com", type: "Bug", message: "x".repeat(32) };

function fakeTelegram(status = 200) {
	const calls: { url: string; body: string }[] = [];
	const fetchFn = (async (url: string, init?: RequestInit) => {
		calls.push({ url, body: String(init?.body) });
		return new Response(JSON.stringify({ ok: status === 200, result: {} }), { status });
	}) as typeof fetch;
	return { calls, fetchFn };
}

describe("sendContact", () => {
	test("a valid submission reaches the configured chat with every field", async () => {
		const { calls, fetchFn } = fakeTelegram();
		expect(await sendContact(valid, env, fetchFn)).toEqual({ ok: true });
		expect(calls).toHaveLength(1);
		expect(calls[0]?.url).toBe("https://api.telegram.org/bot123:abc/sendMessage");
		for (const text of ["Ana", "ana@example.com", "Bug", "x".repeat(32), '"chat_id":"42"'])
			expect(calls[0]?.body).toContain(text);
	});

	test("invalid input is refused without calling Telegram", async () => {
		const cases = [
			{ ...valid, message: "x".repeat(31) },
			{ ...valid, message: "x".repeat(513) },
			{ ...valid, email: "sem-arroba" },
			{ ...valid, type: "Spam" },
			{ ...valid, name: "" },
			{ ...valid, website: "http://spam.example" },
			null,
		];
		for (const input of cases) {
			const { calls, fetchFn } = fakeTelegram();
			expect((await sendContact(input, env, fetchFn)).ok).toBe(false);
			expect(calls).toHaveLength(0);
		}
	});

	test("a Telegram failure becomes a friendly error", async () => {
		const { fetchFn } = fakeTelegram(500);
		const result = await sendContact(valid, env, fetchFn);
		expect(result.ok).toBe(false);
	});
});
