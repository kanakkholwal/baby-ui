<script lang="ts">
import { Button, Card, CardFooter, CardHeader } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Card
	padding={(props.padding as "sm" | "md" | "lg") ?? "md"}
	interactive={Boolean(props.interactive)}
	class="w-80"
>
	<CardHeader title="Deploy preview" description="Builds on every push to a branch." />
	<p class="mt-3 text-muted-foreground text-sm">
		Previews are torn down when the branch is deleted.
	</p>
	<CardFooter>
		<Button size="sm">Open</Button>
		<Button size="sm" variant="ghost">Settings</Button>
	</CardFooter>
</Card>
