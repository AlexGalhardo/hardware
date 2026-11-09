interface Props {
	GA_MEASUREMENT_ID: string;
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: Props) {
	return (
		<>
			<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
			<script
				id="ga-init"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: fixed analytics snippet, no user input reaches it
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_MEASUREMENT_ID}');`,
				}}
			/>
		</>
	);
}
