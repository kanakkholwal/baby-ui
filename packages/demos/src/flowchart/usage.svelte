<script lang="ts">
import { Flowchart } from "@baby-ui/svelte";
</script>

<Flowchart
	steps={[
		{ id: "start", row: 0, x: 0.5, w: 260, hue: "#5b8def", title: "Start", caption: "Entry point" },
		{ id: "end", row: 1, x: 0.5, w: 260, hue: "#22c55e", title: "Done", caption: "Workflow finished" },
	]}
	edges={[{ from: "start", to: "end" }]}
/>
