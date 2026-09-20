<script lang="ts">
import { Switch } from "@baby-ui/svelte";

let checked = $state(true);
</script>

<Switch bind:checked label="Automatic deploys" />
