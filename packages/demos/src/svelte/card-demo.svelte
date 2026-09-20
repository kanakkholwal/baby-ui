<script lang="ts">
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Card interactive={props.interactive !== false} class="w-72">
	<CardHeader>
		<CardTitle>Deploy preview</CardTitle>
		<CardDescription>Builds on every push to a branch.</CardDescription>
	</CardHeader>
	<CardContent>
		<p class="text-muted-foreground text-sm">Ready in about 40 seconds.</p>
	</CardContent>
	<CardFooter>
		<Button size="sm" variant="outline">Open</Button>
	</CardFooter>
</Card>
