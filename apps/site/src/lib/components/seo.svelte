<script lang="ts">
import { page } from "$app/state";
import { absoluteUrl, DEFAULT_KEYWORDS, ogImageUrl, SITE_NAME } from "$lib/seo";

let {
	title,
	description,
	keywords = [],
	/** Small category label on the OG card, e.g. "Agents". */
	tag,
	image,
	type = "website",
	noindex = false,
}: {
	title: string;
	description: string;
	keywords?: string[];
	tag?: string;
	/** Defaults to the branded OG card for this title/description. */
	image?: string;
	type?: "website" | "article";
	noindex?: boolean;
} = $props();

const fullTitle = $derived(title === SITE_NAME ? title : `${title} · ${SITE_NAME}`);
const canonical = $derived(absoluteUrl(page.url.origin, page.url.pathname));
const ogImage = $derived(
	image ?? ogImageUrl(page.url.origin, { title, description, tag }),
);
const keywordList = $derived(keywords.length ? keywords : DEFAULT_KEYWORDS);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywordList.join(", ")} />
	<link rel="canonical" href={canonical} />
	<meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>
