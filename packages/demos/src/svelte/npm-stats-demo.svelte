<script lang="ts">
import { NpmStats } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { DEMO_NPM_PACKAGES } from "../data/npm-stats";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof NpmStats>>(props));
const packages = $derived(DEMO_NPM_PACKAGES);
let range = $state<"30d" | "90d">("30d");
$effect(() => {
	range = p.range === "90d" ? "90d" : "30d";
});
</script>

<div class="w-full max-w-4xl">
	<NpmStats
		{packages}
		variant={p.variant ?? "default"}
		locale={p.locale || undefined}
		bind:range
	/>
</div>
