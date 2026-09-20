<script lang="ts">
import { Textarea } from "@baby-ui/svelte";

let value = $state("");
</script>

<Textarea
	bind:value
	label="Release notes"
	description="Markdown is supported."
	rows={3}
	maxlength={280}
	showCount
	autoGrow
/>
