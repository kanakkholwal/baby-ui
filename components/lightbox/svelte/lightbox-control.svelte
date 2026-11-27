<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import type { LightboxIcon } from "../icons";
import { lightbox } from "../variants";
import { getLightbox } from "./context.svelte";
import LightboxIconView from "./lightbox-icon.svelte";

let {
	icon,
	label,
	class: classProp,
	disabled = false,
	pressed,
	slot,
	onclick,
}: {
	icon: LightboxIcon;
	label: string;
	class?: string;
	disabled?: boolean;
	pressed?: boolean;
	slot?: string;
	onclick?: () => void;
} = $props();

const viewer = getLightbox();
const control = $derived(lightbox({ variant: viewer.variant }).control());
</script>

<Button
	variant="ghost"
	size="icon"
	data-slot={slot}
	aria-label={label}
	aria-pressed={pressed}
	title={label}
	class={cn(control, classProp)}
	{disabled}
	{onclick}
>
	<LightboxIconView name={icon} />
</Button>
