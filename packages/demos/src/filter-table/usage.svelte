<script lang="ts">
import { FilterTable } from "@baby-ui/svelte";
</script>

<FilterTable
	rows={[
		{ task: "Restock mango sorbet", date: "Dec 03", status: "todo", owner: "Mango Moon Gelato" },
		{ task: "Order waffle cones", date: "Apr 14", status: "done", owner: "Aurora Scoops" },
	]}
/>
