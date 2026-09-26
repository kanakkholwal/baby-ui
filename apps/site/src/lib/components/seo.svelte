<script lang="ts">
import { dev } from "$app/environment";
import { page } from "$app/state";
import {
	absoluteUrl,
	DEFAULT_KEYWORDS,
	type JsonLd,
	jsonLdScript,
	ogImageUrl,
	SITE_NAME,
	SITE_URL,
} from "$lib/seo";

let {
	title,
	description,
	keywords = [],
	/** Small category label on the OG card, e.g. "Agents". */
	tag,
	image,
	type = "website",
	noindex = false,
	jsonLd = [],
	markdown,
}: {
	title: string;
	description: string;
	keywords?: string[];
	tag?: string;
	/** Defaults to the branded OG card for this title/description. */
	image?: string;
	type?: "website" | "article";
	noindex?: boolean;
	/** Schema.org nodes for this page, emitted as one @graph. */
	jsonLd?: JsonLd[];
	/** Path of the page's markdown twin, advertised to crawlers and LLM tools. */
	markdown?: string;
} = $props();

const fullTitle = $derived(
	title.startsWith(SITE_NAME) ? title : `${title} · ${SITE_NAME}`,
);
// Prerendering runs at http://sveltekit-prerender, so the request origin is only trusted in dev.
const origin = $derived(dev ? page.url.origin : SITE_URL);
const canonical = $derived(absoluteUrl(origin, page.url.pathname));
const ogImage = $derived(image ?? ogImageUrl(origin, { title, description, tag }));
const keywordList = $derived(keywords.length ? keywords : DEFAULT_KEYWORDS);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywordList.join(", ")} />
	<link rel="canonical" href={canonical} />
	<meta
		name="robots"
		content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"}
	/>
	{#if markdown}
		<link rel="alternate" type="text/markdown" href={absoluteUrl(origin, markdown)} />
	{/if}

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={fullTitle} />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content={fullTitle} />
	{#if jsonLd.length}
		{@html jsonLdScript(jsonLd)}
	{/if}
</svelte:head>
