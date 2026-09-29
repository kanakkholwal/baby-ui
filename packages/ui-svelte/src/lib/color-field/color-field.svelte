<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import ColorPicker from "../color-picker/color-picker.svelte";
import InputGroup from "../input-group/input-group.svelte";
import InputGroupAddon from "../input-group/input-group-addon.svelte";
import InputGroupInput from "../input-group/input-group-input.svelte";
import { cn } from "../lib/cn";
import Popover from "../popover/popover.svelte";
import PopoverContent from "../popover/popover-content.svelte";
import PopoverTrigger from "../popover/popover-trigger.svelte";
import { keyStep, parseHex, stepHex } from "./core";
import { type ColorFieldSize, colorField } from "./variants";

let {
	value = $bindable("#000000"),
	onValueChange,
	size = "md",
	invalid = false,
	label = "Colour",
	picker = true,
	disabled = false,
	class: classProp,
	onblur,
	onkeydown,
	...rest
}: Omit<HTMLInputAttributes, "size" | "value" | "class"> & {
	/** Hex colour. Bindable. */
	value?: string;
	onValueChange?: (value: string) => void;
	size?: ColorFieldSize;
	invalid?: boolean;
	/** Accessible name for the hex input and the swatch's picker. */
	label?: string;
	/** The swatch opens the full ColorPicker; off, it is only a preview. */
	picker?: boolean;
	class?: string;
} = $props();

const s = $derived(colorField({ size }));
const committed = $derived(parseHex(value) ?? "#000000");
// What the user is typing; null shows the committed value.
let draft = $state<string | null>(null);
const parsed = $derived(draft === null ? committed : parseHex(draft));

function commit(next: string) {
	draft = null;
	if (next === committed) return;
	value = next;
	onValueChange?.(next);
}

function keydown(event: KeyboardEvent & { currentTarget: HTMLInputElement }) {
	const step = keyStep(event.key);
	if (event.key === "Enter" && parsed) commit(parsed);
	else if (event.key === "Escape") draft = null;
	else if (step !== null) {
		event.preventDefault();
		commit(stepHex(parsed ?? committed, step));
	}
	onkeydown?.(event);
}

function blur(event: FocusEvent & { currentTarget: HTMLInputElement }) {
	if (parsed) commit(parsed);
	else draft = null;
	onblur?.(event);
}
</script>

{#snippet swatch()}
	<span aria-hidden="true" class={s.swatch()} style:background-color={parsed ?? committed}></span>
{/snippet}

<InputGroup {size} data-slot="color-field" class={cn(s.root(), classProp)}>
	<InputGroupAddon>
		{#if picker}
			<Popover>
				<PopoverTrigger {disabled} aria-label="Pick {label.toLowerCase()}" class={s.trigger()}>
					{@render swatch()}
				</PopoverTrigger>
				<PopoverContent class={s.content()}>
					<ColorPicker bind:value={() => committed, commit} {label} />
				</PopoverContent>
			</Popover>
		{:else}
			{@render swatch()}
		{/if}
	</InputGroupAddon>
	<InputGroupInput
		{...rest}
		{disabled}
		aria-label={label}
		invalid={invalid || parsed === null}
		spellcheck={false}
		autocomplete="off"
		value={draft ?? committed.toUpperCase()}
		oninput={(e) => (draft = e.currentTarget.value)}
		onblur={blur}
		onkeydown={keydown}
		class={s.input()}
	/>
</InputGroup>
