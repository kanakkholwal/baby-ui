<script lang="ts">
import { FlightStatusCard } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { FLIGHT, flightRemaining } from "../data/flight";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof FlightStatusCard>>(props));

const progress = $derived(Number(props.progress ?? 45));
</script>

<FlightStatusCard
	{...FLIGHT}
	departureCode={p.departureCode || "YYZ"}
	arrivalCode={p.arrivalCode || "HND"}
	status={p.status ?? "departed"}
	{progress}
	remaining={flightRemaining(progress)}
	tone={p.tone || undefined}
	display={p.display ?? "matrix"}
/>
