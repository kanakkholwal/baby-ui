<script lang="ts">
import {
	Button,
	Command,
	CommandBar,
	CommandDialog,
	CommandEmpty,
	CommandFilter,
	CommandFilters,
	CommandFooter,
	CommandGroup,
	CommandHeader,
	CommandHint,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
	type CommandVariant,
} from "@baby-ui/svelte";
import { COMMAND_ALL, COMMAND_GROUPS } from "../data/command";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const VARIANTS: CommandVariant[] = ["default", "framed", "launcher", "spotlight"];
const variant = $derived(VARIANTS.find((v) => v === props.variant) ?? "default");
const placeholder = $derived(
	typeof props.placeholder === "string" && props.placeholder
		? props.placeholder
		: variant === "spotlight"
			? "What are you searching for?"
			: "Type a command or search…",
);

let open = $state(false);
let last = $state("");
let filter = $state("all");
const groups = $derived(
	filter === "all" ? COMMAND_GROUPS : COMMAND_GROUPS.filter((g) => g.id === filter),
);

function run(id: string) {
	last = id;
	open = false;
}
</script>

{#snippet icon(d: string)}
	<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
		<path {d} stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
{/snippet}

<div class="flex flex-col items-center gap-3">
	<Button variant="outline" onclick={() => (open = true)}>Open palette</Button>
	{#if last}<p class="text-muted-foreground text-xs">Ran: {last}</p>{/if}
</div>

<CommandDialog bind:open {variant} description={typeof props.description === "string" && props.description ? props.description : undefined}>
	<Command>
		{#if variant === "framed"}<CommandHeader>Command</CommandHeader>{/if}
		{#if variant === "launcher"}
			<CommandBar>
				<CommandInput {placeholder} hint="⌘K" />
				<CommandFilters bind:value={filter} label="Show">
					{#each [COMMAND_ALL, ...COMMAND_GROUPS] as group (group.id)}
						<CommandFilter value={group.id} label={group.heading}>{@render icon(group.icon)}</CommandFilter>
					{/each}
				</CommandFilters>
			</CommandBar>
		{:else if variant === "spotlight"}
			<CommandInput {placeholder} hint="esc" />
			<CommandFilters bind:value={filter} label="Scope">
				{#each [COMMAND_ALL, ...COMMAND_GROUPS] as group (group.id)}
					<CommandFilter value={group.id} label={group.heading}>{group.heading}</CommandFilter>
				{/each}
			</CommandFilters>
		{:else}
			<CommandInput {placeholder} />
		{/if}
		<CommandList>
			<CommandEmpty>{typeof props.emptyLabel === "string" ? props.emptyLabel : "No results"}</CommandEmpty>
			{#each groups as group (group.id)}
				<CommandGroup heading={group.heading}>
					{#each group.items as item (item.value)}
						<CommandItem value={item.value} keywords={item.keywords} onclick={() => run(item.value)}>
							{@render icon(group.icon)}
							{#if "description" in item && item.description}
								<span class="flex min-w-0 flex-1 flex-col">
									<span class="truncate">{item.value}</span>
									<span class="truncate text-muted-foreground text-xs">{item.description}</span>
								</span>
							{:else}
								<span class="min-w-0 flex-1 truncate">{item.value}</span>
							{/if}
							{#if "shortcut" in item && item.shortcut}<CommandShortcut>{item.shortcut}</CommandShortcut>{/if}
						</CommandItem>
					{/each}
				</CommandGroup>
			{/each}
		</CommandList>
		{#if variant === "launcher" || variant === "framed" || variant === "spotlight"}
			<CommandFooter>
				<span class="flex items-center gap-4">
					<CommandHint keys={["↑", "↓"]}>{variant === "spotlight" ? "Navigate" : "Move"}</CommandHint>
					<CommandHint keys={["↵"]}>Open</CommandHint>
				</span>
				{#if variant === "launcher"}<CommandHint keys={["Esc"]}>Close</CommandHint>{/if}
			</CommandFooter>
		{/if}
	</Command>
</CommandDialog>
