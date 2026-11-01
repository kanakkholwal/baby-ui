<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { cn } from "../../lib/cn";
import { TOOL_ICONS, TOOL_STATUS_TEXT, type ToolKind, type ToolState } from "../variants";
import { toolContext } from "./context";

let {
	name,
	title,
	kind = "function",
	labels,
	class: classProp,
}: {
	/** The tool's name as the model calls it, e.g. `search_docs`. */
	name: string;
	/** What the call is doing, in words, e.g. "Searching the docs". */
	title?: string;
	/** Picks the icon: a function, a terminal command, a web request or a search. */
	kind?: ToolKind;
	/** Replaces the status text, e.g. for another language. */
	labels?: Partial<Record<ToolState, string>>;
	class?: string;
} = $props();
const ctx = toolContext("ToolTrigger");
const s = $derived(ctx.styles);
const text = $derived(labels?.[ctx.status] ?? TOOL_STATUS_TEXT[ctx.status]);
</script>

<CollapsiblePrimitive.Trigger data-slot="tool-trigger" class={cn(s.trigger(), classProp)}>
	<span aria-hidden="true" class={s.kind()}><svg viewBox="0 0 24 24"><path d={TOOL_ICONS[kind]} /></svg></span>
	<span class={s.heading()}>
		{#if title}<span class={s.title()}>{title}</span>{/if}
		<span class={title ? s.name() : cn(s.name(), "text-foreground")}>{name}</span>
	</span>
	<span data-status={ctx.status} class={s.status()}>
		{#if ctx.status === "running"}
			<svg viewBox="0 0 12 12" fill="none" aria-hidden="true" class="spinner size-3"><circle cx="6" cy="6" r="4.4" stroke="currentColor" stroke-width="1.5" opacity="0.25" /><path d="M10.4 6A4.4 4.4 0 0 0 6 1.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
		{:else if ctx.status === "done" || ctx.status === "error"}
			<svg viewBox="0 0 24 24" aria-hidden="true" class={s.statusIcon()}><path d={TOOL_ICONS[ctx.status]} /></svg>
		{/if}
		{#key text}<span class={s.statusText()}>{text}</span>{/key}
	</span>
	<svg viewBox="0 0 24 24" aria-hidden="true" class={s.chevron()}><path d={TOOL_ICONS.chevron} /></svg>
</CollapsiblePrimitive.Trigger>
