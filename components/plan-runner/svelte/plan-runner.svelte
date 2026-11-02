<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type PlanRunnerVariant, planRunner } from "../variants";
import { setPlanRunner } from "./context";

let {
	variant = "framed",
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLElement> & { variant?: PlanRunnerVariant } = $props();

let active = $state<string | null>(null);
const styles = $derived(planRunner({ variant }));
setPlanRunner({
	get styles() {
		return styles;
	},
	get active() {
		return active;
	},
	set active(next) {
		active = next;
	},
});
</script>

<!-- The root: an agent's plan, run step by step, with progress, output and a way to steer it. -->
<section data-slot="plan-runner" data-variant={variant} data-active={active ?? undefined} class={cn(styles.root(), classProp)} {...rest}>
	{@render children?.()}
</section>
