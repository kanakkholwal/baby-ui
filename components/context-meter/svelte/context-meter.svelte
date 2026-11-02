<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type ContextMeterVariant, type ContextSegment, contextMeter } from "../variants";
import { setContextMeter } from "./context";

let {
	segments,
	limit,
	warnAt = 0.7,
	compactAt = 0.85,
	onAction,
	variant = "framed",
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLElement> & {
	/** What fills the window, in the order the bar draws them. */
	segments: ContextSegment[];
	/** The model's window, in tokens. */
	limit: number;
	/** From 0 to 1: past it the percentage turns amber. */
	warnAt?: number;
	/** From 0 to 1: where the bar marks auto-compaction; past it the percentage turns red. */
	compactAt?: number;
	/** A row's `action` was pressed, e.g. "Clear" on tool results. */
	onAction?: (id: string) => void;
	variant?: ContextMeterVariant;
} = $props();

const used = $derived(segments.reduce((sum, s) => sum + Math.max(0, s.value), 0));
const ratio = $derived(limit > 0 ? used / limit : 0);
let active = $state<string | null>(null);
const styles = $derived(contextMeter({ variant }));
setContextMeter({
	get segments() {
		return segments;
	},
	get limit() {
		return limit;
	},
	get used() {
		return used;
	},
	get compactAt() {
		return compactAt;
	},
	get onAction() {
		return onAction;
	},
	get active() {
		return active;
	},
	set active(next) {
		active = next;
	},
	get styles() {
		return styles;
	},
});
</script>

<!-- The root: how full a model's context window is, split by what fills it. -->
<section
	data-slot="context-meter"
	data-variant={variant}
	data-warn={(ratio >= warnAt && ratio < compactAt) || undefined}
	data-compact={ratio >= compactAt || undefined}
	data-active={active ?? undefined}
	aria-label="Context window"
	class={cn(styles.root(), classProp)}
	{...rest}
>
	{@render children?.()}
</section>
