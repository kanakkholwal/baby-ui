<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import Progress from "../../progress/svelte/progress.svelte";
import { clampProgress, taskSteps } from "../variants";

let {
	title,
	done,
	total,
	class: classProp,
	...rest
}: Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
	title: string;
	/** Steps finished, shown as "2 of 4" with a bar. */
	done: number;
	total: number;
} = $props();
const s = taskSteps();
const ratio = $derived(total > 0 ? clampProgress(done / total) : 0);
</script>

<!-- A title over the plan with how far it has got. Works outside TaskSteps too. -->
<div data-slot="task-steps-header" class={cn(s.header(), classProp)} {...rest}>
	<div class={s.headerRow()}>
		<p class={s.title()}>{title}</p>
		<span class={s.count()}>{done} of {total}</span>
	</div>
	<Progress size="sm" value={ratio * 100} label="Steps done" />
</div>
