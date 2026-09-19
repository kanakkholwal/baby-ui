<script lang="ts">
import type { PropSpec } from "@baby-ui/registry-schema";

let { props: specs }: { props: PropSpec[] } = $props();
const chip =
	"rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-[11px] text-foreground";
</script>

{#if specs.length}
	<div class="divide-y divide-border rounded-xl border border-border">
		{#each specs as prop (prop.name)}
			<div
				class="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-[140px_minmax(160px,0.75fr)_minmax(240px,2fr)] sm:gap-4"
			>
				<code class="h-fit w-fit {chip}">{prop.name}{prop.required ? "" : "?"}</code>
				<div class="min-w-0">
					<code class="w-fit wrap-anywhere {chip}">{prop.type}</code>
					<p class="mt-1.5 text-muted-foreground text-sm">{prop.description}</p>
				</div>
				<code class="h-fit w-fit min-w-0 wrap-anywhere sm:justify-self-end {chip}">
					{prop.default === undefined ? "—" : String(prop.default)}
				</code>
			</div>
		{/each}
	</div>
{/if}
