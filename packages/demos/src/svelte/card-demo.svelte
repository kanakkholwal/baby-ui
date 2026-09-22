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
	type CardVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Card
	interactive={props.interactive !== false}
	variant={(props.variant as CardVariant) ?? "default"}
	class="w-full max-w-md"
>
	<CardHeader>
		<CardTitle class="text-base">baby-ui</CardTitle>
		<CardDescription>baby-ui.nexonauts.com</CardDescription>
		<CardAction><Badge variant="secondary">SvelteKit</Badge></CardAction>
	</CardHeader>
	<CardContent class="flex flex-col gap-3 text-sm">
		<div class="flex items-center gap-2">
			<span class="size-2 rounded-full bg-success" aria-hidden="true"></span>
			<span class="font-medium text-foreground">Ready</span>
			<span class="ml-auto text-muted-foreground">Production</span>
			<span class="text-muted-foreground">Deployed 2h ago</span>
		</div>
		<div class="flex items-center gap-2 rounded-lg bg-foreground/[0.04] px-3 py-2">
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4 shrink-0 text-muted-foreground">
				<path d="M5 3v10M5 6a3 3 0 0 0 6 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
				<circle cx="5" cy="3" r="1.5" stroke="currentColor" stroke-width="1.4" />
				<circle cx="11" cy="4" r="1.5" stroke="currentColor" stroke-width="1.4" />
				<circle cx="5" cy="13" r="1.5" stroke="currentColor" stroke-width="1.4" />
			</svg>
			<span class="font-medium text-foreground">main</span>
			<span class="truncate text-muted-foreground">feat(select): unfold from the trigger edge</span>
			<span class="ml-auto shrink-0 font-mono text-muted-foreground text-xs">20a9de6</span>
		</div>
	</CardContent>
	<CardFooter class="justify-end">
		<Button size="sm" variant="outline">Visit</Button>
		<Button size="sm">View deployment</Button>
	</CardFooter>
</Card>
