<script lang="ts">
import { Input, Label } from "@baby-ui/svelte";

let value = $state("");
</script>

<div class="flex flex-col gap-1.5">
	<Label for="project">Project name</Label>
	<Input id="project" bind:value placeholder="acme-web" />
</div>
