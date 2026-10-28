<script lang="ts">
import { FullscreenNav } from "@baby-ui/svelte";

let open = $state(false);
const links = [
	{ href: "/work", label: "Work" },
	{ href: "/studio", label: "Studio" },
	{ href: "/contact", label: "Contact" },
];
</script>

<button type="button" onclick={() => (open = true)}>Menu</button>

<FullscreenNav bind:open {links} title="Menu" />
