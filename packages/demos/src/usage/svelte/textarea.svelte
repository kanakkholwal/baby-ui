<script lang="ts">
import { Label, Textarea } from "@baby-ui/svelte";

let value = $state("");
</script>

<div class="flex flex-col gap-1.5">
	<Label for="notes">Release notes</Label>
	<Textarea id="notes" bind:value rows={3} autoGrow />
</div>
