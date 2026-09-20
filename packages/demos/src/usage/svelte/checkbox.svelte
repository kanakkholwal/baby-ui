<script lang="ts">
import { Checkbox } from "@baby-ui/svelte";

let checked = $state(true);
</script>

<Checkbox
	bind:checked
	label="Deploy on push"
	description="Every commit to main triggers a build."
/>
