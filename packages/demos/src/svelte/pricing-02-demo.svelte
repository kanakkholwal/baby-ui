<script lang="ts">
import { Pricing02, type Pricing02Variant } from "@baby-ui/svelte";
import { PRICING_PERIODS, PRICING_PLANS_02 } from "../data/pricing";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let period = $state("monthly");
let chosen = $state<string | null>(null);
</script>

<div class="flex w-full flex-col gap-2">
	<Pricing02
		plans={PRICING_PLANS_02}
		periods={PRICING_PERIODS}
		bind:period
		onSelect={(id, p) => (chosen = `${id}, ${p}`)}
		eyebrow="Simple pricing"
		title={"Start small.\nKeep room to grow."}
		description="Straightforward plans with every essential included. Upgrade, downgrade, or cancel whenever you like."
		footnotes={["No credit card required for Starter.", "Prices exclude applicable taxes."]}
		variant={(props.variant as Pricing02Variant) ?? "soft"}
	/>
	<p aria-live="polite" class="text-center text-muted-foreground text-xs">
		{chosen ? `Chose ${chosen}` : ""}
	</p>
</div>
