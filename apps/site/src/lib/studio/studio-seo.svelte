<script lang="ts">
import Seo from "#lib/components/seo.svelte";
import { breadcrumbLd, webApplicationLd } from "#lib/seo.js";
import { STUDIOS } from "./studios";

let { slug, crumb }: { slug: string; crumb: string } = $props();

const studio = $derived(STUDIOS.find((s) => s.slug === slug));
</script>

{#if studio}
	<Seo
		title={studio.seo.title}
		description={studio.seo.description}
		tag="Free tool"
		keywords={studio.seo.keywords}
		jsonLd={[
			webApplicationLd({
				name: studio.name,
				description: studio.seo.description,
				path: studio.href,
				features: studio.seo.features,
				keywords: studio.seo.keywords,
			}),
			breadcrumbLd([
				{ name: "Studio", path: "/studio" },
				{ name: crumb, path: studio.href },
			]),
		]}
	/>
{/if}
