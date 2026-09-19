<script lang="ts">
import SpecDials from "@baby-ui/demos/controls";
import type { ComponentSpec } from "@baby-ui/registry-schema";

let {
	spec,
	values = $bindable(),
}: { spec: ComponentSpec; values: Record<string, unknown> } = $props();

const hasControls = $derived(spec.props.some((p) => p.control.kind !== "none"));
</script>

<div class="flex flex-col gap-6">
	{#if hasControls}
		<section>
			<p
				class="mb-2 px-1 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider"
			>
				Controls
			</p>
			{#key spec.slug}
				<SpecDials {spec} bind:values />
			{/key}
		</section>
	{/if}

	{#if spec.a11y.keyboard.length}
		<section class="rounded-xl border border-border bg-card/40">
			<p
				class="border-border/60 border-b px-3 py-2 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider"
			>
				Keyboard
			</p>
			<ul class="flex flex-col gap-1.5 p-3 text-muted-foreground text-xs">
				{#each spec.a11y.keyboard as rule (rule)}
					<li>{rule}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if spec.licenseOrigin}
		<section class="rounded-xl border border-border bg-card/40 p-3 text-muted-foreground text-xs">
			<p>
				Ported from
				<a
					href={spec.licenseOrigin.url}
					rel="noreferrer"
					class="text-foreground underline underline-offset-2">{spec.licenseOrigin.source}</a
				>
				({spec.licenseOrigin.license}).
			</p>
			<p class="mt-1">{spec.licenseOrigin.copyright}</p>
		</section>
	{/if}
</div>
