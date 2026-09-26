<script lang="ts">
import { DocsNav, type DocsNavConnector } from "@baby-ui/svelte";
import { DOCS_SECTIONS } from "../data/docs-nav";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let current = $state("#installation");
</script>

<div class="w-64 max-w-full">
	<DocsNav
		sections={DOCS_SECTIONS}
		{current}
		connector={(props.connector as DocsNavConnector) ?? "tick"}
		rungs={props.rungs === true}
		onNavigate={(href, event) => {
			event.preventDefault();
			current = href;
		}}
	/>
</div>
