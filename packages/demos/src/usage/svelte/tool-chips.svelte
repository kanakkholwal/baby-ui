<script lang="ts">
import { ToolChips } from "@baby-ui/svelte";
</script>

<ToolChips
	steps={[
		{ label: "Read file", chip: "config.ts", mono: true, detail: [{ text: "212 lines" }] },
	]}
	diffs={[{ file: "config.ts", add: 4, del: 1 }]}
/>
