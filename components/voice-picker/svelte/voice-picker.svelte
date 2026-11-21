<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type VoicePickerVariant, type VoiceSampleState, voicePicker } from "../variants";
import { setVoicePicker, type Voice } from "./context";

/** Choose a voice, hear it, set the speed. The app owns the audio and reports `sample`. */
let {
	voices,
	value = $bindable(),
	speed = $bindable(1),
	onValueChange,
	onSpeedChange,
	sample = "idle",
	variant = "stack",
	class: classProp,
	children,
	...rest
}: {
	voices: Voice[];
	/** The chosen voice id; bindable. Starts at the first voice. */
	value?: string;
	/** Speaking speed; bindable. */
	speed?: number;
	onValueChange?: (id: string) => void;
	onSpeedChange?: (speed: number) => void;
	/** `making` while the sample is prepared, `playing` while it is heard. */
	sample?: VoiceSampleState;
	variant?: VoicePickerVariant;
	class?: string;
	children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> = $props();

setVoicePicker({
	get voices() {
		return voices;
	},
	get voice() {
		return value ?? voices[0]?.id ?? "";
	},
	set voice(next) {
		value = next;
		onValueChange?.(next);
	},
	get speed() {
		return speed;
	},
	set speed(next) {
		speed = next;
		onSpeedChange?.(next);
	},
	get sample() {
		return sample;
	},
	get variant() {
		return variant;
	},
});

const root = $derived(voicePicker({ variant }).root());
</script>

<div {...rest} data-slot="voice-picker" data-sample={sample} class={cn(root, classProp)}>
	{@render children?.()}
</div>
