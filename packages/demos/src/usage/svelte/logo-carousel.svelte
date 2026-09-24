<script lang="ts">
import { LogoCarousel } from "@baby-ui/svelte";

const LOGOS = ["Acme", "Nimbus", "Kestrel", "Orbital"];
</script>

{#snippet logo(name: unknown)}
	<span class="flex h-10 w-24 items-center justify-center text-sm">{String(name)}</span>
{/snippet}

<LogoCarousel items={LOGOS} {logo} columnCount={4} />
