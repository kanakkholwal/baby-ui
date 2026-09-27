<script lang="ts">
import {
	OgNewsletterIssue,
	type OgNewsletterIssueMode,
	type OgNewsletterIssueTone,
} from "@baby-ui/svelte";
import { OG_NEWSLETTER_ISSUE } from "../data/og-samples";
import OgFrame from "./og-frame.svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<OgFrame>
	<OgNewsletterIssue
		publication={(props.publication as string) || "The Render Loop"}
		headline={(props.headline as string) ||
			"Why every design system eventually rebuilds its tokens"}
		issue={(props.issue as string) ?? undefined}
		date={(props.date as string) ?? undefined}
		inside={OG_NEWSLETTER_ISSUE.inside}
		insideLabel={(props.insideLabel as string) || undefined}
		mode={(props.mode as OgNewsletterIssueMode) ?? "light"}
		tone={(props.tone as OgNewsletterIssueTone) ?? "neutral"}
	/>
</OgFrame>
