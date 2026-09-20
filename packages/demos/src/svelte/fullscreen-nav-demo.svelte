<script lang="ts">
import { FullscreenNav } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);

const links = [
	{ href: "#product", label: "Product" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#docs", label: "Docs" },
	{ href: "#blog", label: "Blog" },
];
</script>

<button type="button" class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm" onclick={() => (open = true)}>Open navigation</button>

<FullscreenNav {links} bind:open title={(props.title as string) || "Menu"} />
