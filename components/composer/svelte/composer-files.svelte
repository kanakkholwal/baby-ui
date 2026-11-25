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
const ctx = composerState("ComposerFiles");
let inner = $state<HTMLDivElement>();
let open = $state(false);

// Watches the tiles, so the row can fold shut once the last one is removed.
$effect(() => {
	const el = inner;
	if (!el) return;
	const update = () => (open = el.childElementCount > 0);
	update();
	const observer = new MutationObserver(update);
	observer.observe(el, { childList: true });
	return () => observer.disconnect();
});
</script>

<!-- The row of attachments above the text. It opens while it holds any ComposerAttachment. -->
<div data-slot="composer-files" data-open={open} inert={!open} class={cn(ctx.styles.files(), classProp)} {...rest}>
	<div bind:this={inner} class={ctx.styles.filesInner()}>
		{@render children?.()}
	</div>
</div>
