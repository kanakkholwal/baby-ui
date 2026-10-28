<script lang="ts">
import {
	Button,
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@baby-ui/svelte";
</script>

<Card interactive>
	<CardHeader>
		<CardTitle>Production</CardTitle>
		<CardDescription>Deployed 4 minutes ago from main.</CardDescription>
		<CardAction>
			<Button size="sm" variant="ghost">Redeploy</Button>
		</CardAction>
	</CardHeader>
	<CardContent>
		<p class="text-muted-foreground text-sm">acme-web.pages.dev</p>
	</CardContent>
	<CardFooter>
		<Button size="sm" variant="outline">View logs</Button>
	</CardFooter>
</Card>
