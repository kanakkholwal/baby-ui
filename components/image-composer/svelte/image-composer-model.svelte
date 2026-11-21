<script lang="ts">
import type { Snippet } from "svelte";
import Badge from "../../badge/svelte/badge.svelte";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
</script>

<Badge data-slot="image-composer-model" size="sm" variant="secondary" class={classProp}>
	{@render children?.()}
</Badge>
