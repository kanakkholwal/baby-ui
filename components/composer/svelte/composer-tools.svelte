<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { composerState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const ctx = composerState("ComposerTools");
</script>

<!-- The group on the right of the toolbar: the model, voice and send. -->
<div data-slot="composer-tools" class={cn(ctx.styles.tools(), classProp)} {...rest}>
	{@render children?.()}
</div>
