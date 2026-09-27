<script lang="ts">
import { Separator, type SeparatorVariant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const variant = $derived((props.variant as SeparatorVariant) ?? "solid");
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
