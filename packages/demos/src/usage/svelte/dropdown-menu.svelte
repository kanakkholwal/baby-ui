<script lang="ts">
import { DropdownMenu } from "@baby-ui/svelte";

const items = [
	{ id: "profile", label: "Profile" },
	{ id: "team", label: "Team settings" },
	{ id: "logout", label: "Sign out" },
];
</script>

<DropdownMenu {items} onselect={(id) => console.log(id)}>
	{#snippet trigger()}
		Account
	{/snippet}
</DropdownMenu>
