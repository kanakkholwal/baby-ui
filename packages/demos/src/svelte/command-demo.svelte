<script lang="ts">
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);
let last = $state("");

function run(id: string) {
	last = id;
	open = false;
}
</script>

<div class="flex flex-col items-center gap-3">
	<button type="button" class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm" onclick={() => (open = true)}>Open palette</button>
	{#if last}<p class="text-muted-foreground text-xs">Ran: {last}</p>{/if}
</div>

<CommandDialog bind:open>
	<Command>
		<CommandInput placeholder={(props.placeholder as string) || "Type a command or search…"} />
		<CommandList>
			<CommandEmpty>{(props.emptyLabel as string) || "No results"}</CommandEmpty>
			<CommandGroup heading="Actions">
				<CommandItem value="New project" onclick={() => run("new")}>
					New project
					<CommandShortcut>N</CommandShortcut>
				</CommandItem>
				<CommandItem value="Deploy" keywords="ship release" onclick={() => run("deploy")}>
					Deploy
					<CommandShortcut>D</CommandShortcut>
				</CommandItem>
			</CommandGroup>
			<CommandGroup heading="Go to">
				<CommandItem value="Documentation" onclick={() => run("docs")}>
					Documentation
				</CommandItem>
				<CommandItem value="Settings" onclick={() => run("settings")}>Settings</CommandItem>
			</CommandGroup>
		</CommandList>
	</Command>
</CommandDialog>
