<script lang="ts">
import { goto } from "$app/navigation";
import { Command } from "@baby-ui/svelte";
import IconSearch from "@tabler/icons-svelte/icons/search";
import { searchItems } from "$lib/registry";

let open = $state(false);
let mac = $state(false);

const items = [
	{ id: "/docs", label: "Getting started", group: "Guides", description: "Install and set up" },
	{ id: "/components", label: "All components", group: "Guides", description: "Browse the registry" },
	...searchItems().map((item) => ({
		id: item.href,
		label: item.name,
		group: item.group,
		description: item.description,
	})),
];

$effect(() => {
	mac = navigator.platform.toLowerCase().includes("mac");
	const onKey = (e: KeyboardEvent) => {
		if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
});
</script>

<button
	type="button"
	onclick={() => (open = true)}
	class="hidden h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl border border-border bg-card/20 px-3 text-muted-foreground text-xs transition-colors hover:border-border-strong hover:text-foreground sm:flex lg:w-48"
>
	<IconSearch size={14} stroke={1.6} class="shrink-0" />
	<span class="hidden lg:inline">Search…</span>
	<kbd
		class="ml-auto hidden shrink-0 rounded border border-border px-1 font-mono text-[10px] leading-4 lg:inline"
	>
		{mac ? "⌘K" : "Ctrl K"}
	</kbd>
</button>

<Command
	bind:open
	{items}
	placeholder="Search components and guides…"
	emptyLabel="Nothing matches that."
	footer="Enter to open · Escape to close"
	onselect={(href) => goto(href)}
/>
