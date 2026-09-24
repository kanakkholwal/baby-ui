<script lang="ts">
import { cn } from "../lib/cn";
import { type InertiaKick, inertiaKick } from "./variants";

let {
	word,
	index,
	intensity,
	velocity,
	class: className,
}: {
	word: string;
	index: number;
	intensity: number;
	velocity: () => { x: number; y: number };
	class: string;
} = $props();

let kick = $state<(InertiaKick & { n: number }) | null>(null);
</script>

<span
	aria-hidden="true"
	class={cn(className, kick && (kick.n % 2 ? "text-inertia-kick-a" : "text-inertia-kick-b"))}
	style:--ti-x={kick ? `${kick.x}px` : undefined}
	style:--ti-y={kick ? `${kick.y}px` : undefined}
	style:--ti-r={kick ? `${kick.r}deg` : undefined}
	onpointerenter={() => {
		kick = { ...inertiaKick(velocity(), index, intensity), n: (kick?.n ?? 0) + 1 };
	}}
	onanimationend={() => (kick = null)}>{word}</span
>
