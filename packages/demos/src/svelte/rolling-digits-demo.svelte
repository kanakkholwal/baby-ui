<script lang="ts">
import {
	RollingDigits,
	type RollingDigitsDirection,
	type RollingDigitsSize,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const values = [1284, 1312, 1296, 1450, 9870, 10240];
let step = $state(0);

$effect(() => {
	const id = setInterval(() => (step = (step + 1) % values.length), 1800);
	return () => clearInterval(id);
});
</script>

<RollingDigits
	value={values[step] ?? 0}
	pad={props.pad === undefined ? undefined : Number(props.pad)}
	locale={(props.locale as string) || "en-US"}
	startOnView={props.startOnView !== false}
	stepMs={Number(props.stepMs ?? 80)}
	coalesce={props.coalesce === true}
	direction={(props.direction as RollingDigitsDirection) ?? "dynamic"}
	offset={Number(props.offset ?? 32)}
	size={(props.size as RollingDigitsSize) ?? "inherit"}
	class="font-semibold text-5xl text-foreground tracking-tight"
/>
