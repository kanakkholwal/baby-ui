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

let open = $state(false);
</script>

<button type="button" onclick={() => (open = true)}>Open palette</button>

<CommandDialog bind:open>
	<Command>
		<CommandInput />
		<CommandList>
			<CommandEmpty>Nothing matches that.</CommandEmpty>
			<CommandGroup heading="Actions">
				<CommandItem value="New project">
					New project
					<CommandShortcut>N</CommandShortcut>
				</CommandItem>
				<CommandItem value="Deploy" keywords="ship release">Deploy</CommandItem>
			</CommandGroup>
		</CommandList>
	</Command>
</CommandDialog>
