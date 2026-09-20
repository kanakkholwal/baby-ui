<script lang="ts">
import { Breadcrumb } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const items = [
	{ href: "/", label: "Home" },
	{ href: "/components", label: "Components" },
	{ href: "/components/base", label: "Base" },
	{ href: "/components/base/nav", label: "Navigation" },
	{ label: "Breadcrumb" },
];
</script>

<Breadcrumb {items} maxVisible={Number(props.maxVisible ?? 4)} />
