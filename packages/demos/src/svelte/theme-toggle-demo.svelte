<script lang="ts">
import { ThemeToggle, type ThemeToggleValue } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ThemeToggle>>(props));

let theme = $state<ThemeToggleValue>("light");

$effect(() => {
	theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
});

function onThemeChange(next: ThemeToggleValue) {
	const root = document.documentElement;
	root.classList.toggle("dark", next === "dark");
	root.style.colorScheme = next;
	theme = next;
}
</script>

<ThemeToggle
	{theme}
	{onThemeChange}
	variant={p.variant ?? "rectangle"}
	start={p.start ?? "bottom-up"}
	class="rounded-xl border border-border bg-background p-2.5"
	iconClass="size-5"
/>
