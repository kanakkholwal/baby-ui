<script lang="ts">
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandHeader,
	CommandInput,
	CommandItem,
	CommandList,
} from "@baby-ui/svelte";
import IconSearch from "@tabler/icons-svelte/icons/search";
import { goto } from "$app/navigation";
import { searchItems } from "$lib/registry";

let open = $state(false);
let mac = $state(false);

const GUIDES = [
	{ href: "/docs", name: "Getting started", description: "Install and set up" },
	{ href: "/components", name: "All components", description: "Browse the registry" },
];

const groups = $derived.by(() => {
	const items = searchItems();
	const names = [...new Set(items.map((item) => item.group))];
	return names.map((name) => ({
		name,
		items: items.filter((item) => item.group === name),
	}));
});

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

function go(href: string) {
	open = false;
	void goto(href);
}
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

<CommandDialog bind:open variant="framed">
	<Command>
		<CommandHeader>Search</CommandHeader>
		<CommandInput placeholder="Search components and guides…" />
		<CommandList>
			<CommandEmpty>Nothing matches that.</CommandEmpty>
			<CommandGroup heading="Guides">
				{#each GUIDES as guide (guide.href)}
					<CommandItem value={guide.name} keywords={guide.description} onclick={() => go(guide.href)}>
						<span class="min-w-0">
							<span class="block truncate">{guide.name}</span>
							<span class="block truncate text-muted-foreground text-xs">
								{guide.description}
							</span>
						</span>
					</CommandItem>
				{/each}
			</CommandGroup>
			{#each groups as group (group.name)}
				<CommandGroup heading={group.name}>
					{#each group.items as item (item.href)}
						<CommandItem
							value={item.name}
							keywords={item.description}
							onclick={() => go(item.href)}
						>
							<span class="min-w-0">
								<span class="block truncate">{item.name}</span>
								<span class="block truncate text-muted-foreground text-xs">
									{item.description}
								</span>
							</span>
						</CommandItem>
					{/each}
				</CommandGroup>
			{/each}
		</CommandList>
		<p class="shrink-0 border-border border-t px-4 py-2 text-[11px] text-muted-foreground">
			Enter to open · Escape to close
		</p>
	</Command>
</CommandDialog>
