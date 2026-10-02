<script lang="ts">
import { GithubStats } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { DEMO_GITHUB_STATS } from "../data/github-stats";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof GithubStats>>(props));
let view = $state<"days" | "weeks">("days");
$effect(() => {
	view = p.view === "weeks" ? "weeks" : "days";
});
</script>

<div class="w-full max-w-5xl">
	<GithubStats
		data={DEMO_GITHUB_STATS}
		variant={p.variant ?? "default"}
		locale={p.locale || undefined}
		bind:view
	/>
</div>
