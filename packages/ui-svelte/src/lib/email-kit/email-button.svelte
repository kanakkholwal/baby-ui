<script lang="ts">
import { Button } from "@better-svelte-email/components";
import type { Snippet } from "svelte";
import {
	EMAIL_BUTTON_PADDING,
	type EmailButtonSize,
	type EmailButtonVariant,
	emailButton,
} from "./variants";

let {
	href,
	children,
	variant = "primary",
	size = "md",
}: {
	href: string;
	children: Snippet;
	variant?: EmailButtonVariant;
	size?: EmailButtonSize;
} = $props();

const pad = $derived(EMAIL_BUTTON_PADDING[size]);
</script>

<Button {href} pX={pad.x} pY={pad.y} class={emailButton({ variant, size })}>{@render children()}</Button>
