<script lang="ts">
import { RollingDigits } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof RollingDigits>>(props));

const values = [128400, 131250, 129600, 145000, 987000, 1024000];
let step = $state(0);

$effect(() => {
	const id = setInterval(() => (step = (step + 1) % values.length), 1800);
	return () => clearInterval(id);
});
</script>

<div class="text-5xl">
	<RollingDigits
		value={values[step] ?? 0}
		pad={props.pad === undefined ? undefined : Number(props.pad)}
		locale={p.locale || undefined}
		startOnView={props.startOnView !== false}
		stepMs={Number(props.stepMs ?? 80)}
		variant={p.variant ?? "roll"}
		durationMs={props.durationMs === undefined ? undefined : Number(props.durationMs)}
		coalesce={props.coalesce === true}
		direction={p.direction ?? "dynamic"}
		offset={Number(props.offset ?? 32)}
		size={p.size ?? "inherit"}
		class="font-semibold text-foreground tracking-tight"
	/>
</div>
