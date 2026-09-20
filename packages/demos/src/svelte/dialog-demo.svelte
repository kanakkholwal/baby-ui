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

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);
</script>

<Dialog
	bind:open
	size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
	dismissOnBackdrop={props.dismissOnBackdrop !== false}
>
	<DialogTrigger class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm">Open dialog</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<div class="min-w-0">
				<DialogTitle>Deploy to production</DialogTitle>
				<DialogDescription>This will replace the current build.</DialogDescription>
			</div>
			<DialogClose />
		</DialogHeader>
		<p class="mt-4 text-muted-foreground text-sm">
			Traffic shifts as soon as the build is healthy. The previous deployment stays available
			for instant rollback.
		</p>
		<DialogFooter>
			<Button variant="ghost" size="sm" onclick={() => (open = false)}>Cancel</Button>
			<Button size="sm" onclick={() => (open = false)}>Deploy</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
