<script lang="ts">
import { Skeleton } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Skeleton>>(props));

const shape = $derived(p.shape ?? "line");
</script>

<div class="flex w-full max-w-72 items-center gap-3">
	<Skeleton width="2.5rem" height="2.5rem" shape="circle" />
	<div class="flex flex-1 flex-col gap-2">
		<Skeleton width={p.width || "100%"} height={p.height || "1rem"} {shape} />
		<Skeleton width="60%" height="0.75rem" />
	</div>
</div>
