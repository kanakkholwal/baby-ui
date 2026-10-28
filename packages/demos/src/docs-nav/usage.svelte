<script lang="ts">
import { DocsNav } from "@baby-ui/svelte";

let { pathname }: { pathname: string } = $props();

const sections = [
	{
		id: "start",
		label: "Getting started",
		items: [
			{ href: "/docs", label: "Introduction" },
			{ href: "/docs/installation", label: "Installation" },
		],
	},
	{
		id: "components",
		label: "Components",
		count: 2,
		items: [
			{ href: "/docs/button", label: "Button" },
			{ href: "/docs/dialog", label: "Dialog", badge: "beta" },
		],
	},
];
</script>

<DocsNav {sections} current={pathname} connector="curve" />
