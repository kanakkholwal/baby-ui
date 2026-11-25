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
const ctx = composerState("ComposerFooter");
</script>

<!-- The row around the card: chips on the left, the context ring on the right. -->
<div data-slot="composer-footer" class={cn(ctx.styles.footer(), classProp)} {...rest}>
	{@render children?.()}
</div>
