import { expect, test } from "bun:test";
import { isScriptClient } from "./scrapers";

const CHROME =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";

test("script clients and headless browsers are blocked", () => {
	for (const ua of [
		null,
		"",
		"curl/8.9.1",
		"Wget/1.21",
		"python-requests/2.32.3",
		"Scrapy/2.11 (+https://scrapy.org)",
		"Go-http-client/2.0",
		"axios/1.7.0",
		"node-fetch",
		CHROME.replace("Chrome/", "HeadlessChrome/"),
	])
		expect(isScriptClient(ua)).toBe(true);
});

test("browsers, search engines, AI crawlers and link previews pass", () => {
	for (const ua of [
		CHROME,
		"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
		"Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
		"Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
		"Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
		"facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
		"WhatsApp/2.23.20.0",
	])
		expect(isScriptClient(ua)).toBe(false);
});
