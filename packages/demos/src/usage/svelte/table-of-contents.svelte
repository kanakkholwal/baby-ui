<script lang="ts">
import { TableOfContents } from "@baby-ui/svelte";

const items = [
	{ id: "getting-started", label: "Getting started", depth: 2 as const },
	{ id: "install", label: "Install the CLI", depth: 3 as const },
	{ id: "theming", label: "Theming", depth: 2 as const },
	{ id: "tokens", label: "Colour tokens", depth: 3 as const },
];
</script>

<aside class="sticky top-20">
	<TableOfContents {items} scrollOffset={56} />
</aside>
