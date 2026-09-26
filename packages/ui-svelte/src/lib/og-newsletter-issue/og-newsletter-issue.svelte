<script lang="ts">
import { cn } from "../lib/cn";
import {
	type OgNewsletterIssueMode,
	type OgNewsletterIssueTone,
	ogNewsletterIssue,
} from "./variants";

let {
	publication,
	headline,
	issue,
	date,
	logo,
	inside,
	insideLabel = "Also inside",
	mode = "light",
	tone = "chart",
	class: className,
}: {
	/** Newsletter name, set small at the top. */
	publication: string;
	/** Lead story headline, the focal point; clamps to three lines. */
	headline: string;
	/** Pre-formatted issue label, e.g. "No. 42". */
	issue?: string;
	date?: string;
	logo?: string;
	/** One "also inside" headline under the lead. */
	inside?: string;
	insideLabel?: string;
	mode?: OgNewsletterIssueMode;
	tone?: OgNewsletterIssueTone;
	class?: string;
} = $props();

const s = $derived(ogNewsletterIssue({ mode, tone }));
const issueLine = $derived([issue, date].filter(Boolean).join(" · "));
</script>

<div data-slot="og-newsletter-issue" class={cn(s.root(), className)}>
	<div class={s.masthead()}>
		<div class={s.brand()}>
			{#if logo}<img src={logo} alt="" class={s.logo()} />{/if}
			<span class={s.publication()}>{publication}</span>
		</div>
		{#if issueLine}<span class={s.issue()}>{issueLine}</span>{/if}
	</div>
	<h1 class={s.headline()}>{headline}</h1>
	{#if inside}
		<div class={s.inside()}>
			<span class={s.insideLabel()}>{insideLabel}</span>
			<span class={s.insideText()}>{inside}</span>
		</div>
	{/if}
</div>
