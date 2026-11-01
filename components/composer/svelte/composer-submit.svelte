<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { composerState } from "./context";

let {
	sendLabel = "Send prompt",
	stopLabel = "Stop generating",
	class: classProp,
}: { sendLabel?: string; stopLabel?: string; class?: string } = $props();
const ctx = composerState("ComposerSubmit");
</script>

<!-- Sends the text, or stops the reply while `loading`; the icons swap with a rise. -->
<Button
	type={ctx.loading ? "button" : "submit"}
	size="icon-sm"
	data-slot="composer-submit"
	data-state={ctx.loading ? "stop" : "send"}
	onclick={ctx.loading ? () => ctx.onStop?.() : undefined}
	disabled={ctx.loading ? !ctx.onStop : !ctx.canSubmit}
	aria-label={ctx.loading ? stopLabel : sendLabel}
	class={cn(ctx.styles.submit(), classProp)}
>
	{#key ctx.loading}
		<span class={ctx.styles.submitIcon()}>
			{#if ctx.loading}
				<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" class="size-3"><rect x="2" y="2" width="12" height="12" rx="2.5" /></svg>
			{:else}
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
					<path d="M8 13V3.5M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			{/if}
		</span>
	{/key}
</Button>
