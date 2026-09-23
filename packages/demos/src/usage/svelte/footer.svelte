<script lang="ts">
import { Footer, type FooterColumn } from "@baby-ui/svelte";

const columns: FooterColumn[] = [
	{
		title: "Product",
		links: [
			{ label: "Features", href: "/features" },
			{ label: "Pricing", href: "/pricing" },
		],
	},
];
</script>

{#snippet copyright()}
	© {new Date().getFullYear()} Acme, Inc.
{/snippet}

<Footer description="A one-line pitch for what you build." {columns} {copyright} wordmark="Acme">
	{#snippet brand()}
		<span class="font-semibold text-foreground">Acme</span>
	{/snippet}
</Footer>
