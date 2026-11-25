<script lang="ts">
import { cn } from "../../lib/cn";
import { CONTEXT_RING_LENGTH, contextOffset } from "../variants";
import { composerState } from "./context";

let {
	percent,
	label = "Context used",
	class: classProp,
}: { percent: number; label?: string; class?: string } = $props();
const ctx = composerState("ComposerContext");
const value = $derived(Math.round(Math.min(100, Math.max(0, percent))));
</script>

<!-- How full the context window is, 0 to 100, as a ring and a percentage. -->
<span data-slot="composer-context" role="img" aria-label="{label}: {value}%" class={cn(ctx.styles.usage(), classProp)}>
	<svg viewBox="0 0 20 20" aria-hidden="true" class="-rotate-90">
		<circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2.5" class="opacity-25" />
		<circle
			cx="10"
			cy="10"
			r="7"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-dasharray={CONTEXT_RING_LENGTH}
			stroke-dashoffset={contextOffset(percent)}
			class="transition-[stroke-dashoffset] duration-(--duration-slow) ease-(--ease-ui-out) motion-reduce:transition-none"
		/>
	</svg>
	<span aria-hidden="true">{value}%</span>
</span>
