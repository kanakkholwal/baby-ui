<script lang="ts">
import { DiffTable } from "@baby-ui/svelte";
</script>

<DiffTable
	rows={[
		{ key: "docs", label: "docs/setup.md", category: "Docs", detail: "removed", change: "removed" },
		{ key: "readme", label: "README.md", category: "Docs", detail: "added", change: "added" },
	]}
/>
