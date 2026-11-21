<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { loadedModels } from "../variants";
import { getLoadedModels } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const ctx = getLoadedModels();
const styles = loadedModels();
</script>

<div data-slot="loaded-models-header" class={cn(styles.header(), classProp)}>
	{#if children}
		{@render children()}
	{:else}
		<p class={styles.title()}>In memory</p>
		<span class={styles.count()}>{ctx.loaded.length === 0 ? "Free" : `${ctx.loaded.length} in use`}</span>
	{/if}
</div>
