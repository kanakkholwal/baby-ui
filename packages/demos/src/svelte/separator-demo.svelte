<script lang="ts">
import { Separator } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Separator>>(props));

const variant = $derived(p.variant ?? "solid");
</script>

<div class="w-full max-w-sm">
	<div class="flex flex-col gap-1">
		<p class="font-medium text-sm">Baby UI</p>
		<p class="text-muted-foreground text-sm">Components for React and Svelte.</p>
	</div>
	<Separator {variant} class="my-4" />
	<div class="flex h-5 items-center gap-4 text-sm">
		<span>Docs</span>
		<Separator {variant} orientation="vertical" />
		<span>Components</span>
		<Separator {variant} orientation="vertical" />
		<span>Changelog</span>
	</div>
</div>
