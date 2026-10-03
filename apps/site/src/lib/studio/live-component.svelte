<script lang="ts">
import { Spinner } from "@baby-ui/svelte";
import { type AnyProps, loadComponent } from "#lib/component-module.js";

let { slug, entry, props }: { slug: string; entry: string; props: AnyProps } = $props();

const loading = $derived(loadComponent(slug, entry));
</script>

{#await loading}
	<div class="absolute inset-0 grid place-items-center">
		<Spinner size="sm" label="Loading background" class="text-muted-foreground" />
	</div>
{:then Live}
	{#if Live}
		<Live {...props} />
	{/if}
{/await}
