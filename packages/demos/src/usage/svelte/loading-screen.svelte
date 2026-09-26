<script lang="ts">
import { LoadingScreen } from "@baby-ui/svelte";

let ready = $state(false);
</script>

{#snippet logo()}
	<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="currentColor" /></svg>
{/snippet}

<LoadingScreen open={!ready} {logo} indicator="dots" />
