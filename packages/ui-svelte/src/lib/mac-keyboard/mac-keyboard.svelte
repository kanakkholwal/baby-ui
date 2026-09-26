<script lang="ts">
import { cn } from "../lib/cn";
import {
	FILLED_ICONS,
	MAC_ARROW_KEYS,
	MAC_ARROW_WIDTH,
	MAC_KEY_ICONS,
	MAC_KEYBOARD_LABELS,
	MAC_KEYBOARD_ROWS,
	type MacKey,
	type MacKeyboardLabels,
	togglePressed,
} from "./layout";
import { type MacKeyboardSize, type MacKeyboardVariant, macKeyboard } from "./variants";

let {
	pressed = $bindable([]),
	onPressedChange,
	listen = true,
	variant = "default",
	size = "md",
	labels: labelsProp,
	class: className,
}: {
	/** `KeyboardEvent.code` values currently held down; bindable. */
	pressed?: string[];
	onPressedChange?: (pressed: string[]) => void;
	/** Mirror the physical keyboard while the page has focus. */
	listen?: boolean;
	variant?: MacKeyboardVariant;
	size?: MacKeyboardSize;
	labels?: Partial<MacKeyboardLabels>;
	class?: string;
} = $props();

const labels = $derived({ ...MAC_KEYBOARD_LABELS, ...labelsProp });
const styles = $derived(macKeyboard({ variant, size }));

function press(code: string, down: boolean) {
	const next = togglePressed(pressed, code, down);
	if (!next) return;
	pressed = next;
	onPressedChange?.(next);
}

$effect(() => {
	if (!listen) return;
	const down = (event: KeyboardEvent) => {
		if (!event.repeat) press(event.code, true);
	};
	const up = (event: KeyboardEvent) => press(event.code, false);
	const clear = () => {
		for (const code of [...pressed]) press(code, false);
	};
	window.addEventListener("keydown", down);
	window.addEventListener("keyup", up);
	window.addEventListener("blur", clear);
	return () => {
		window.removeEventListener("keydown", down);
		window.removeEventListener("keyup", up);
		window.removeEventListener("blur", clear);
	};
});
</script>

{#snippet keyCap(key: MacKey, extra?: string)}
	{@const s = macKeyboard({ variant, size, kind: key.kind, end: key.end ?? false })}
	{@const legend = key.name ? labels[key.name] : key.label}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		data-slot="mac-keyboard-key"
		data-code={key.code}
		data-pressed={pressed.includes(key.code) ? "" : undefined}
		class={cn(s.key(), extra)}
		onpointerdown={(event) => {
			event.currentTarget.setPointerCapture(event.pointerId);
			press(key.code, true);
		}}
		onpointerup={() => press(key.code, false)}
		onpointercancel={() => press(key.code, false)}
	>
		{#if key.kind === "caps"}<span class={s.led()}></span>{/if}
		{#if key.kind === "dual"}<span class={s.sub()}>{key.shift}</span>{/if}
		{#if key.icon}
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				fill={FILLED_ICONS.has(key.icon) ? "currentColor" : "none"}
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class={s.icon()}
			>
				{#each MAC_KEY_ICONS[key.icon] as d (d)}<path {d} />{/each}
			</svg>
		{/if}
		{#if key.kind === "fn"}
			<span class={s.sub()}>{legend}</span>
		{:else if legend}
			<span class={s.legend()}>{legend}</span>
		{/if}
	</div>
{/snippet}

<div data-slot="mac-keyboard" role="img" aria-label={labels.keyboard} class={cn(styles.root(), className)}>
	{#each MAC_KEYBOARD_ROWS as row, r (r)}
		<div class={styles.row()}>
			{#each row as key (key.code)}
				<div class={styles.slot()} style="--w: {key.width ?? 1};">
					{@render keyCap(key)}
				</div>
			{/each}
			{#if r === MAC_KEYBOARD_ROWS.length - 1}
				<div class={styles.arrows()} style="--w: {MAC_ARROW_WIDTH};">
					{@render keyCap(MAC_ARROW_KEYS.up, "col-start-2 row-start-1 rounded-[4px]")}
					{@render keyCap(MAC_ARROW_KEYS.left, "col-start-1 row-start-2 rounded-[4px]")}
					{@render keyCap(MAC_ARROW_KEYS.down, "col-start-2 row-start-2 rounded-[4px]")}
					{@render keyCap(MAC_ARROW_KEYS.right, "col-start-3 row-start-2 rounded-[4px]")}
				</div>
			{/if}
		</div>
	{/each}
</div>
