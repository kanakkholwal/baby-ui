<script lang="ts">
import SpecDials from "@baby-ui/demos/controls";
import type { ComponentSpec } from "@baby-ui/registry-schema";

let {
	spec,
	values = $bindable(),
}: { spec: ComponentSpec; values: Record<string, unknown> } = $props();

const hasControls = $derived(spec.props.some((p) => p.control.kind !== "none"));
</script>

{#snippet heading(text: string)}
	<p class="mb-2 px-1 font-medium text-[10px] text-muted-foreground uppercase tracking-[0.14em]">
		{text}
	</p>
{/snippet}

<div class="flex flex-col gap-5">
	{#if hasControls}
		<section>
			{@render heading("Controls")}
			{#key spec.slug}
				<SpecDials {spec} bind:values />
			{/key}
		</section>
	{/if}

	{#if spec.a11y.keyboard.length}
		<section>
			{@render heading("Keyboard")}
			<ul
				class="divide-y divide-border rounded-xl border border-border bg-card/40 text-muted-foreground text-xs"
			>
				{#each spec.a11y.keyboard as rule (rule)}
					<li class="px-3 py-2 leading-relaxed">{rule}</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- Base components all trace to the same MIT sources, so the credit belongs in
	     THIRD_PARTY_LICENSES, not on 47 pages. Ported specialities still name theirs. -->
	{#if spec.licenseOrigin && spec.category !== "base"}
		<p class="px-1 text-[11px] text-muted-foreground leading-relaxed">
			Ported from
			<a
				href={spec.licenseOrigin.url}
				rel="noreferrer"
				class="text-foreground underline underline-offset-2">{spec.licenseOrigin.source}</a
			>
			· {spec.licenseOrigin.license} · {spec.licenseOrigin.copyright}
		</p>
	{/if}
</div>
