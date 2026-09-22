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
	CommandShortcut,
	type DialogVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);
let last = $state("");

function run(id: string) {
	last = id;
	open = false;
}
</script>

{#snippet icon(d: string)}
	<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4 shrink-0 text-muted-foreground">
		<path {d} stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
{/snippet}

<div class="flex flex-col items-center gap-3">
	<button type="button" class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm" onclick={() => (open = true)}>Open palette</button>
	{#if last}<p class="text-muted-foreground text-xs">Ran: {last}</p>{/if}
</div>

<CommandDialog bind:open variant={(props.variant as DialogVariant) ?? "default"}>
	<Command>
		<CommandHeader>Command</CommandHeader>
		<CommandInput placeholder={(props.placeholder as string) || "Type a command or search…"} />
		<CommandList>
			<CommandEmpty>{(props.emptyLabel as string) || "No results"}</CommandEmpty>
			<CommandGroup heading="Actions">
				<CommandItem value="New project" onclick={() => run("new")}>
					<span class="flex min-w-0 items-center gap-2">
						{@render icon("M8 3.5v9M3.5 8h9")}
						New project
					</span>
					<CommandShortcut>N</CommandShortcut>
				</CommandItem>
				<CommandItem value="Deploy" keywords="ship release" onclick={() => run("deploy")}>
					<span class="flex min-w-0 items-center gap-2">
						{@render icon("M8 12.5v-9m0 0L4.5 7m3.5-3.5L11.5 7")}
						Deploy
					</span>
					<CommandShortcut>D</CommandShortcut>
				</CommandItem>
			</CommandGroup>
			<CommandGroup heading="Go to">
				<CommandItem value="Documentation" onclick={() => run("docs")}>
					<span class="flex min-w-0 items-center gap-2">
						{@render icon("M3.5 3.5h5.5a2 2 0 0 1 2 2v7h-7.5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Zm0 0v9")}
						Documentation
					</span>
				</CommandItem>
				<CommandItem value="Settings" onclick={() => run("settings")}>
					<span class="flex min-w-0 items-center gap-2">
						<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4 shrink-0 text-muted-foreground">
							<circle cx="8" cy="8" r="2.2" stroke="currentColor" stroke-width="1.4" />
							<path
								d="M12.8 8a4.7 4.7 0 0 1-.06.75l1.16.9-1.1 1.9-1.36-.46a4.8 4.8 0 0 1-1.3.75l-.2 1.42H7.06l-.2-1.42a4.8 4.8 0 0 1-1.3-.75l-1.36.46-1.1-1.9 1.16-.9A4.7 4.7 0 0 1 4.2 8c0-.26.02-.5.06-.75l-1.16-.9 1.1-1.9 1.36.46c.39-.32.83-.57 1.3-.75l.2-1.42h1.88l.2 1.42c.47.18.91.43 1.3.75l1.36-.46 1.1 1.9-1.16.9c.04.25.06.49.06.75Z"
								stroke="currentColor"
								stroke-width="1.4"
								stroke-linejoin="round"
							/>
						</svg>
						Settings
					</span>
				</CommandItem>
			</CommandGroup>
		</CommandList>
	</Command>
</CommandDialog>
