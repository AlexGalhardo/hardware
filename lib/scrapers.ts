// HTTP libraries and automated browsers that send their default user agent. Search engines, AI crawlers and link
// previews (Googlebot, Bingbot, GPTBot, facebookexternalhit...) do not match and keep full access.
// ponytail: a user-agent check only stops scripts that don't fake a browser; rate limiting is the next step.
const SCRIPT_CLIENT =
	/curl|wget|python-requests|python-urllib|python-httpx|aiohttp|scrapy|go-http-client|okhttp|java\/|axios|node-fetch|undici|libwww-perl|httpclient|guzzle|colly|mechanize|headlesschrome|phantomjs|puppeteer|playwright|selenium/i;

export function isScriptClient(userAgent: string | null): boolean {
	return !userAgent?.trim() || SCRIPT_CLIENT.test(userAgent);
}
