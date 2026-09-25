<script lang="ts">
import { Skeleton } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const shape = $derived((props.shape as "line" | "circle" | "block") ?? "line");
</script>

<div class="flex w-full max-w-72 items-center gap-3">
	<Skeleton width="2.5rem" height="2.5rem" shape="circle" />
	<div class="flex flex-1 flex-col gap-2">
		<Skeleton width={(props.width as string) || "100%"} height={(props.height as string) || "1rem"} {shape} />
		<Skeleton width="60%" height="0.75rem" />
	</div>
</div>
