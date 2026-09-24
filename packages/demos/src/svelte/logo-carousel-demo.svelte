<script lang="ts">
import { LogoCarousel } from "@baby-ui/svelte";
import type { Snippet } from "svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const NAMES = [
	"Acme",
	"Nimbus",
	"Kestrel",
	"Orbital",
	"Vantage",
	"Fathom",
	"Beacon",
	"Marrow",
];
</script>

{#snippet logo(name: unknown)}
	<span
		class="flex h-10 w-28 items-center justify-center rounded-lg border border-border bg-card font-medium text-muted-foreground text-sm"
	>
		{String(name)}
	</span>
{/snippet}

<LogoCarousel
	items={NAMES}
	logo={logo as Snippet<[unknown]>}
	columnCount={Number(props.columnCount ?? 4)}
	direction={(props.direction as "ltr" | "rtl") ?? "ltr"}
	class="w-full max-w-lg gap-3"
/>
