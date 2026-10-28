<script lang="ts">
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@baby-ui/svelte";

let open = $state(false);
</script>

<Dialog bind:open>
	<DialogTrigger>Invite</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<div class="min-w-0">
				<DialogTitle>Invite a teammate</DialogTitle>
				<DialogDescription>They get read access by default.</DialogDescription>
			</div>
			<DialogClose />
		</DialogHeader>
		<DialogFooter>
			<Button size="sm" onclick={() => (open = false)}>Send invite</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
