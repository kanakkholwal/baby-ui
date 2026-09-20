<script lang="ts">
import { Breadcrumb } from "@baby-ui/svelte";

const items = [
	{ href: "/", label: "Home" },
	{ href: "/components", label: "Components" },
	{ label: "Breadcrumb" },
];
</script>

<Breadcrumb {items} maxVisible={4} />
