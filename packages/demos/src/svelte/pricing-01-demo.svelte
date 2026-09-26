<script lang="ts">
import { Pricing01, type Pricing01Variant } from "@baby-ui/svelte";
import { PRICING_PERIODS, PRICING_PLANS_01 } from "../data/pricing";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let period = $state("monthly");
let chosen = $state<string | null>(null);
</script>

<div class="flex w-full flex-col gap-2">
	<Pricing01
		plans={PRICING_PLANS_01}
		periods={PRICING_PERIODS}
		bind:period
		onSelect={(id, p) => (chosen = `${id}, ${p}`)}
		eyebrow="Pricing"
		title="A plan for every stage."
		description="Start for free, then move up when your work needs more room. Every plan includes the essentials to ship something great."
		variant={(props.variant as Pricing01Variant) ?? "default"}
	/>
	<p aria-live="polite" class="text-center text-muted-foreground text-xs">
		{chosen ? `Chose ${chosen}` : ""}
	</p>
</div>
