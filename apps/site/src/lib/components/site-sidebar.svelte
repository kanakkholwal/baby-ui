<script lang="ts">
import { DocsNav, type DocsNavConnector, type DocsNavSection } from "@baby-ui/svelte";
import { page } from "$app/state";
import type { SidebarGroup } from "$lib/registry";

let {
	groups,
	connector = "tick",
	rungs = false,
	onNavigate,
}: {
	groups: SidebarGroup[];
	connector?: DocsNavConnector;
	rungs?: boolean;
	onNavigate?: () => void;
} = $props();

const GUIDES: DocsNavSection = {
	id: "guides",
	label: "Getting Started",
	items: [
		{ href: "/docs", label: "Introduction" },
		{ href: "/docs/installation", label: "Installation" },
		{ href: "/docs/theming", label: "Theming" },
		{ href: "/docs/changelog", label: "Changelog" },
	],
};

const sections = $derived<DocsNavSection[]>([
	GUIDES,
	...groups.map((group) => ({
		id: group.category,
		label: group.label,
		count: group.items.length,
		items: group.items.map((item) => ({
			href: item.href,
			label: item.name,
			badge: item.status !== "stable" ? item.status : undefined,
		})),
	})),
]);
</script>

<DocsNav
	{sections}
	current={page.url.pathname}
	{connector}
	{rungs}
	label="Site navigation"
	onNavigate={() => onNavigate?.()}
/>
