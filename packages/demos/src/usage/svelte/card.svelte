<script lang="ts">
import { Button, Card, CardFooter, CardHeader } from "@baby-ui/svelte";
</script>

<Card interactive>
	<CardHeader title="Production" description="Deployed 4 minutes ago from main." />
	<CardFooter>
		<Button size="sm" variant="outline">View logs</Button>
	</CardFooter>
</Card>
