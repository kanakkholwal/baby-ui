<script lang="ts">
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	type DialogVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let done = $state(false);
</script>

<div class="flex flex-col items-center gap-3">
	<AlertDialog variant={(props.variant as DialogVariant) ?? "framed"}>
		<AlertDialogTrigger class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm">Delete project</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Delete this project?</AlertDialogTitle>
				<AlertDialogDescription>
					This removes every deployment and cannot be undone.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					destructive={props.destructive !== false}
					onclick={() => (done = true)}
				>
					Delete
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
	{#if done}<p class="text-muted-foreground text-xs">Confirmed</p>{/if}
</div>
