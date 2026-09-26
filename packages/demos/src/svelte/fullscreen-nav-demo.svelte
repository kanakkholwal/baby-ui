<script lang="ts">
import {
	Button,
	FullscreenNav,
	type FullscreenNavAlign,
	type FullscreenNavSize,
	type FullscreenNavVariant,
} from "@baby-ui/svelte";
import type { Snippet } from "svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);

const links = [
	{ href: "#product", label: "Product", description: "What it does and who it is for" },
	{ href: "#pricing", label: "Pricing", description: "Plans for teams of every size" },
	{ href: "#docs", label: "Docs", description: "Guides and API reference" },
	{ href: "#blog", label: "Blog", description: "Release notes and stories" },
];
</script>

{#snippet footer()}
	<span>hello@example.com</span>
{/snippet}

<Button variant="outline" onclick={() => (open = true)}>Open navigation</Button>

<FullscreenNav
	{links}
	bind:open
	current="#product"
	title={(props.title as string) || "Menu"}
	variant={(props.variant as FullscreenNavVariant) ?? "fade"}
	align={(props.align as FullscreenNavAlign) ?? "start"}
	size={(props.size as FullscreenNavSize) ?? "md"}
	numbered={props.numbered === true}
	footer={footer as unknown as Snippet}
/>
