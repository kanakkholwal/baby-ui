<script lang="ts">
import type { HTMLFormAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type ComposerSize, type ComposerVariant, composer } from "../variants";
import { setComposer } from "./context";

let {
	value = $bindable(""),
	onValueChange,
	onSubmit,
	disabled = false,
	loading = false,
	onStop,
	variant = "outline",
	size = "default",
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
} = $props();

let input: HTMLTextAreaElement | undefined;
const styles = $derived(composer({ variant, size }));
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
<form data-slot="composer" data-variant={variant} data-disabled={disabled || undefined} aria-busy={loading} class={cn(styles.root(), classProp)} {...rest}
	onsubmit={(event) => {
		event.preventDefault();
		submitDraft();
	}}
>
	{@render children?.()}
</form>
