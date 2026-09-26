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
import { track } from "$lib/analytics";
import { type DocsHit, searchDocs } from "$lib/docs-search";
import { type CatalogItem, loadCatalog, searchItems } from "$lib/registry";

let open = $state(false);
let query = $state("");
let hits = $state<DocsHit[]>([]);
let mac = $state(false);

const GUIDES = [
	{
		href: "/docs",
		name: "Introduction",
		description: "What Baby UI is and how it installs",
	},
	{
		href: "/docs/installation",
		name: "Installation",
		description: "Set up a project and add components with the shadcn CLI",
	},
	{
		href: "/docs/theming",
		name: "Theming",
		description: "Colour, dark mode and motion variables",
	},
	{ href: "/components", name: "All components", description: "Browse the registry" },
];

let catalog = $state<CatalogItem[]>([]);

// The catalog is fetched on first open, so pages don't carry every component's metadata.
$effect(() => {
	if (open && !catalog.length) void loadCatalog().then((items) => (catalog = items));
});

const groups = $derived.by(() => {
	const items = searchItems(catalog);
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

// Full-text hits from docvia, beside the command filter's matches on names and descriptions.
$effect(() => {
	const q = query.trim();
	if (q.length < 2) {
		hits = [];
		return;
	}
	let stale = false;
	const timer = setTimeout(async () => {
		try {
			const next = await searchDocs(q, await loadCatalog());
			if (!stale) hits = next;
		} catch {
			if (!stale) hits = [];
		}
	}, 120);
	return () => {
		stale = true;
		clearTimeout(timer);
	};
});

function go(href: string) {
	open = false;
	track("search_selected", { href });
	void goto(href);
}
</script>

<button
	type="button"
	onclick={() => (open = true)}
	aria-label="Search"
	aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
	title="Search ({mac ? "⌘K" : "Ctrl K"})"
	class="grid size-9 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
>
	<IconSearch size={17} stroke={1.6} />
</button>

<CommandDialog bind:open variant="framed">
	<Command>
		<CommandHeader>Search</CommandHeader>
		<CommandInput
			placeholder="Search components and docs…"
			oninput={(e) => (query = e.currentTarget.value)}
		/>
		<CommandList>
			<CommandEmpty>Nothing matches that.</CommandEmpty>
			{#if hits.length}
				<CommandGroup heading="In the docs" forceMount>
					{#each hits as hit (hit.href)}
						<CommandItem value="docs:{hit.href}" forceMount onclick={() => go(hit.href)}>
							<span class="min-w-0">
								<span class="block truncate">
									{hit.page}{#if hit.section}{" "}<span class="text-muted-foreground">› {hit.section}</span>{/if}
								</span>
								<span class="line-clamp-2 text-muted-foreground text-xs">{hit.snippet}</span>
							</span>
						</CommandItem>
					{/each}
				</CommandGroup>
			{/if}
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
							keywords={item.keywords}
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
