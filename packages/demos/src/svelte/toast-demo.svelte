<script lang="ts">
import { Button, Toaster, type ToasterProps, toast } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const position = $derived((props.position as ToasterProps["position"]) ?? "bottom-right");

// The same set beUI's preview opens, plus the tones it lacks.
const EXAMPLES = [
	{ label: "Title only", run: () => toast.success("Saved") },
	{
		label: "Promise",
		run: () => {
			// svelte-sonner's toast.promise() shares one `description` across every
			// state; updating the same id by hand gives loading and success their own.
			const id = toast.loading("Publishing component", {
				description: "Bundling source, preview, and registry metadata.",
			});
			setTimeout(() => {
				toast.success("Component published", {
					id,
					description: "Registry endpoint and raw source are available.",
				});
			}, 1800);
		},
	},
	{
		label: "Success",
		run: () =>
			toast.success("Component published", {
				description: "Registry endpoint and raw source are available.",
			}),
	},
	{
		label: "Error",
		run: () =>
			toast.error("Snapshot failed", {
				description: "Retry after the browser target settles.",
			}),
	},
	{
		label: "Warning",
		run: () =>
			toast.warning("Quota at 90%", {
				description: "Builds pause when the month's minutes run out.",
			}),
	},
	{
		label: "Info",
		run: () =>
			toast.info("New version available", { description: "Reload to pick up 0.4.2." }),
	},
	{
		label: "Action",
		run: () =>
			toast("Invite sent", {
				description: "mia@acme.dev can join the workspace.",
				action: { label: "Undo", onClick: () => toast("Invite withdrawn") },
			}),
	},
];
</script>

<div class="flex flex-col items-center gap-4">
	<div class="flex flex-wrap items-center justify-center gap-2">
		{#each EXAMPLES as example (example.label)}
			<Button variant="outline" size="sm" class="rounded-full" onclick={example.run}>
				{example.label}
			</Button>
		{/each}
		<Button variant="ghost" size="sm" class="rounded-full" onclick={() => toast.dismiss()}>
			Clear
		</Button>
	</div>
	<p class="max-w-sm text-center text-muted-foreground text-xs leading-5">
		Toasts render fixed on the screen. Change the position in the controls to open from
		another edge.
	</p>
</div>

<Toaster {position} expand={props.expand !== false} closeButton={props.closeButton !== false} />
