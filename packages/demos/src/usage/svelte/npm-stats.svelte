<script lang="ts">
import { NpmStats } from "@baby-ui/svelte";
import { DEMO_NPM_PACKAGES } from "../../data/npm-stats";

const packages = $state(DEMO_NPM_PACKAGES);
</script>

<div class="w-full max-w-4xl">
	<NpmStats {packages} locale="en-US" />
</div>
