<script lang="ts">
import { Button, Navbar } from "@baby-ui/svelte";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/docs", label: "Docs" },
];
</script>

<Navbar {links} active="/">
	{#snippet brand()}
		<span class="font-semibold">acme</span>
	{/snippet}
	{#snippet actions()}
		<Button size="sm">Sign in</Button>
	{/snippet}
</Navbar>
