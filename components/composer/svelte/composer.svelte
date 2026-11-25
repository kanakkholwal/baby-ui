<script lang="ts">
import type { HTMLFormAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import {
	type ComposerSnapshot,
	playComposer,
	settleComposer,
	snapshotComposer,
} from "../flip";
import { type ComposerSize, type ComposerVariant, composer } from "../variants";
import { setComposer } from "./context";

let {
	value = $bindable(""),
	onValueChange,
	onSubmit,
	disabled = false,
	loading = false,
	onStop,
	variant = "default",
	size = "default",
	expanded: expandedProp,
	class: classProp,
	children,
	...rest
}: Omit<HTMLFormAttributes, "onsubmit"> & {
	/** The text; bindable. */
	value?: string;
	onValueChange?: (value: string) => void;
	/** Called with the trimmed text on Enter or the send button; the text then clears. */
	onSubmit?: (value: string) => void;
	disabled?: boolean;
	/** A reply is being written: send becomes stop. */
	loading?: boolean;
	onStop?: () => void;
	variant?: ComposerVariant;
	size?: ComposerSize;
	/** Default design only: force the card (true) or the single row (false). By default it opens for attachments or text. */
	expanded?: boolean;
} = $props();

let input: HTMLTextAreaElement | undefined;
const styles = $derived(composer({ variant, size }));
let form = $state<HTMLFormElement>();
let before: ComposerSnapshot | null = null;
let attachments = $state(0);
let focused = $state(false);

// A menu opens in a portal, so focus moving into one keeps the card open.
function onFocusOut(event: FocusEvent) {
	const next = event.relatedTarget;
	const inMenu =
		next instanceof Element && next.closest("[role=menu],[role=listbox],[role=dialog]");
	const form = event.currentTarget;
	if (
		!inMenu &&
		!(form instanceof Element && next instanceof Node && form.contains(next))
	)
		focused = false;
}
const expanded = $derived(
	variant === "default" &&
		(expandedProp ?? (focused || attachments > 0 || value.trim() !== "")),
);
// Glide the parts from their last positions to the new ones when the card opens or closes.
$effect.pre(() => {
	void expanded;
	if (form && variant === "default") before = snapshotComposer(form);
});
$effect(() => {
	void expanded;
	if (!form || variant !== "default") return;
	settleComposer(form);
	if (before) playComposer(form, before, snapshotComposer(form));
});
const canSubmit = $derived(value.trim() !== "" && !disabled && !loading);

function submitDraft() {
	const text = value.trim();
	if (!text || disabled || loading) return;
	onSubmit?.(text);
	value = "";
	onValueChange?.("");
	input?.focus();
}

setComposer({
	get value() {
		return value;
	},
	set value(next) {
		value = next;
		onValueChange?.(next);
	},
	get canSubmit() {
		return canSubmit;
	},
	get disabled() {
		return disabled;
	},
	get loading() {
		return loading;
	},
	get onStop() {
		return onStop;
	},
	get size() {
		return size;
	},
	get variant() {
		return variant;
	},
	get expanded() {
		return expanded;
	},
	registerAttachment() {
		attachments += 1;
		return () => {
			attachments -= 1;
		};
	},
	get styles() {
		return styles;
	},
	submit: () => submitDraft(),
	registerInput(element) {
		input = element;
	},
});
</script>

<!-- The root: a chat input that grows with its text, with a toolbar of parts below it. -->
<form bind:this={form} data-slot="composer" data-variant={variant} data-expanded={variant === "default" ? expanded : undefined} data-disabled={disabled || undefined} aria-busy={loading} class={cn(styles.root(), classProp)} {...rest}
	onfocusin={(event) => {
		if (event.target === input) focused = true;
	}}
	onfocusout={onFocusOut}
	onsubmit={(event) => {
		event.preventDefault();
		submitDraft();
	}}
>
	{@render children?.()}
</form>
