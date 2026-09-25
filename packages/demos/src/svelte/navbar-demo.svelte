<script lang="ts">
import { Navbar, type NavbarVariant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const variant = $derived((props.variant as NavbarVariant) ?? "solid");

const links = [
	{ href: "#product", label: "Product" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#docs", label: "Docs" },
];
</script>

<div class="w-full max-w-3xl overflow-hidden rounded-xl border border-border">
	<Navbar
		{links}
		active="#product"
		sticky={false}
		blur={props.blur !== false}
		{variant}
		class={variant === "solid" ? "border-border border-b bg-card" : undefined}
	>
		{#snippet brand()}
			<span class="font-semibold text-sm tracking-tight">Acme</span>
		{/snippet}
		{#snippet actions()}
			<span
				class="hidden rounded-full bg-primary px-3 py-1.5 font-medium text-primary-foreground text-xs sm:inline-flex"
			>
				Sign up
			</span>
		{/snippet}
	</Navbar>
	<div class="h-24 bg-background"></div>
</div>
