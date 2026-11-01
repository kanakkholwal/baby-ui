<script lang="ts">
import { cn } from "../../lib/cn";
import { COMPOSER_LINE_HEIGHT } from "../variants";
import { composerState } from "./context";

let {
	placeholder = "Ask the agent to do something…",
	minRows = 2,
	maxRows = 8,
	label = "Prompt",
	class: classProp,
}: {
	placeholder?: string;
	minRows?: number;
	/** Past this many lines the text scrolls. */
	maxRows?: number;
	/** Names the field for assistive tech. */
	label?: string;
	class?: string;
} = $props();
const ctx = composerState("ComposerInput");
let textarea = $state<HTMLTextAreaElement>();
let mirror = $state<HTMLDivElement>();

$effect(() => {
	ctx.registerInput(textarea);
	return () => ctx.registerInput(undefined);
});
function resize() {
	const line = COMPOSER_LINE_HEIGHT[ctx.size];
	if (!textarea || !mirror) return;
	textarea.style.height = `${Math.min(Math.max(mirror.scrollHeight, minRows * line), maxRows * line)}px`;
}
$effect(() => {
	ctx.value;
	resize();
});
// A narrower field wraps more lines, so the height follows the width too.
$effect(() => {
	if (!textarea) return;
	const observer = new ResizeObserver(() => resize());
	observer.observe(textarea);
	return () => observer.disconnect();
});

// Enter sends, Shift+Enter breaks the line; an IME's Enter commits its text, not the message.
function onkeydown(event: KeyboardEvent) {
	if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
	event.preventDefault();
	ctx.submit();
}
</script>

<div data-slot="composer-input" class={cn(ctx.styles.input(), classProp)}>
	<div bind:this={mirror} aria-hidden="true" class={ctx.styles.mirror()}>{ctx.value}&#8203;</div>
	<textarea
		bind:this={textarea}
		rows={minRows}
		value={ctx.value}
		{placeholder}
		aria-label={label}
		disabled={ctx.disabled}
		oninput={(event) => (ctx.value = event.currentTarget.value)}
		{onkeydown}
		class={ctx.styles.textarea()}
	></textarea>
</div>
