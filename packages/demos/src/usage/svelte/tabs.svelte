<script lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@baby-ui/svelte";

let value = $state("overview");
</script>

<Tabs bind:value variant="underline">
	<TabsList>
		<TabsTrigger value="overview">Overview</TabsTrigger>
		<TabsTrigger value="activity">Activity</TabsTrigger>
	</TabsList>
	<TabsContent value="overview">Deployment health and traffic.</TabsContent>
	<TabsContent value="activity">Every deploy and who triggered it.</TabsContent>
</Tabs>
