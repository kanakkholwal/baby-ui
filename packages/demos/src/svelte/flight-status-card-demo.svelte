<script lang="ts">
import {
	type FlightStatus,
	FlightStatusCard,
	type FlightStatusDisplay,
	type FlightStatusTone,
} from "@baby-ui/svelte";
import { FLIGHT, flightRemaining } from "../data/flight";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const progress = $derived(Number(props.progress ?? 45));
</script>

<FlightStatusCard
	{...FLIGHT}
	departureCode={(props.departureCode as string) || "YYZ"}
	arrivalCode={(props.arrivalCode as string) || "HND"}
	status={(props.status as FlightStatus) ?? "departed"}
	{progress}
	remaining={flightRemaining(progress)}
	tone={(props.tone as FlightStatusTone) || undefined}
	display={(props.display as FlightStatusDisplay) ?? "matrix"}
/>
