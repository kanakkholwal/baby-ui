<script lang="ts">
import {
	ThemeToggle,
	type ThemeToggleValue,
	type ThemeToggleVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

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
	variant={(props.variant as ThemeToggleVariant) ?? "rectangle"}
	class="rounded-xl border border-border bg-background p-2.5"
	iconClass="size-5"
/>
