<script lang="ts">
import { Button, type MegaMenuGroup, MegaNavbar } from "@baby-ui/svelte";

const groups: MegaMenuGroup[] = [
	{
		label: "Product",
		href: "/features",
		items: [
			{ label: "Features", href: "/features", description: "Everything the app does" },
			{ label: "Pricing", href: "/pricing", description: "Plans and billing" },
		],
		footer: { label: "Start free", href: "/signup", hint: "No card needed" },
	},
];

const links = [{ label: "Docs", href: "/docs" }];
</script>

<MegaNavbar active="/features" {groups} {links}>
	{#snippet brand()}
		<span class="font-semibold text-foreground">Acme</span>
	{/snippet}
	{#snippet actions()}
		<Button size="sm">Sign up</Button>
	{/snippet}
</MegaNavbar>
