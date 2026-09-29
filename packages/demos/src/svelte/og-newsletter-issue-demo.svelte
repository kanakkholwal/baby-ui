<script lang="ts">
import { OgNewsletterIssue } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { OG_NEWSLETTER_ISSUE } from "../data/og-samples";
import { controlProps } from "../data/preview-props";
import OgFrame from "./og-frame.svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof OgNewsletterIssue>>(props));
</script>

<OgFrame>
	<OgNewsletterIssue
		publication={p.publication || "The Render Loop"}
		headline={p.headline ||
			"Why every design system eventually rebuilds its tokens"}
		issue={p.issue ?? undefined}
		date={p.date ?? undefined}
		inside={OG_NEWSLETTER_ISSUE.inside}
		insideLabel={p.insideLabel || undefined}
		mode={p.mode ?? "light"}
		tone={p.tone ?? "neutral"}
	/>
</OgFrame>
