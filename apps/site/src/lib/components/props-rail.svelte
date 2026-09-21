<script lang="ts">
import SpecDials from "@baby-ui/demos/controls";
import type { ComponentSpec } from "@baby-ui/registry-schema";
import type { Heading } from "$lib/docs-nodes";
import { productFor } from "$lib/products";
import KeyboardList from "./keyboard-list.svelte";
import OutlineNav from "./outline-nav.svelte";
import PromoCard from "./promo-card.svelte";
import Tabs from "./tabs.svelte";

let {
	spec,
	values = $bindable(),
	outline = [],
}: {
	spec: ComponentSpec;
	values: Record<string, unknown>;
	outline?: Heading[];
} = $props();

const hasControls = $derived(spec.props.some((p) => p.control.kind !== "none"));
const hasKeys = $derived(spec.a11y.keyboard.length > 0);
const tabs = $derived(
	[
		{ id: "outline", label: "On this page" },
		hasControls && { id: "controls", label: "Controls" },
		hasKeys && { id: "keyboard", label: "Keyboard" },
	].filter((t): t is { id: string; label: string } => Boolean(t)),
);

let tab = $state("outline");
$effect(() => {
	if (!tabs.some((t) => t.id === tab)) tab = tabs[0]?.id ?? "outline";
});
</script>

<div class="flex flex-col gap-5">
	<div>
		<Tabs {tabs} bind:active={tab} variant="underline" class="w-full" />
		<div class="mt-3">
			{#if tab === "controls"}
				{#key spec.slug}
					<SpecDials {spec} bind:values />
				{/key}
			{:else if tab === "keyboard"}
				<KeyboardList rules={spec.a11y.keyboard} />
			{:else}
				<OutlineNav headings={outline} />
			{/if}
		</div>
	</div>

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

	<PromoCard product={productFor(spec.slug)} />
</div>
