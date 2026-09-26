<script lang="ts">
import {
	OrbitCardStack,
	type OrbitCardStackLayout,
	type OrbitCardStackSize,
} from "@baby-ui/svelte";
import { ORBIT_PEOPLE } from "../data/stacks";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<OrbitCardStack
	items={ORBIT_PEOPLE}
	layout={(props.layout as OrbitCardStackLayout) ?? "arc"}
	size={(props.size as OrbitCardStackSize) ?? "md"}
	spread={Number(props.spread ?? 168)}
	lift={Number(props.lift ?? 34)}
/>
