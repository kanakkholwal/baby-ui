<script lang="ts">
import { ShowMore } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-80">
	<ShowMore
		collapsedHeight={Number(props.collapsedHeight ?? 72)}
		moreLabel={(props.moreLabel as string) || "Show more"}
		lessLabel={(props.lessLabel as string) || "Show less"}
	>
		<p>Components here are copied into your project rather than installed, which means you own the source and can change anything. The registry only decides what the first version looks like. Every port satisfies the same ComponentSpec, so the React and Svelte builds behave identically even though neither is generated from the other.</p>
	</ShowMore>
</div>
