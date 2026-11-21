<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";

let {
	children,
	class: classProp,
	...rest
}: DialogPrimitive.TriggerProps & { children?: Snippet } = $props();
</script>

<DialogPrimitive.Trigger {...rest} data-slot="image-viewer-trigger" class={cn("inline-flex", classProp)}>
	{@render children?.()}
</DialogPrimitive.Trigger>
