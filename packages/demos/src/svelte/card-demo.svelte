<script lang="ts">
import {
	Badge,
	Button,
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Card interactive={props.interactive !== false} class="w-120">
	<CardHeader class="border-b">
		<CardTitle>Deploy preview</CardTitle>
		<CardDescription>feat/command-palette</CardDescription>
		<CardAction><Badge variant="success" dot>Ready</Badge></CardAction>
	</CardHeader>
	<CardContent class="grid grid-cols-2 gap-y-3 text-sm">
		<span class="text-muted-foreground">Build time</span>
		<span class="text-right text-foreground tabular-nums">41s</span>
		<span class="text-muted-foreground">Commit</span>
		<span class="text-right font-mono text-foreground text-xs">20a9de6</span>
	</CardContent>
	<CardFooter class="border-t">
		<Button size="sm">Visit preview</Button>
		<Button size="sm" variant="ghost">Logs</Button>
	</CardFooter>
</Card>
