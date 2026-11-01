<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { cn } from "../../lib/cn";
import RollingDigits from "../../rolling-digits/svelte/rolling-digits.svelte";
import { TODO_ICONS } from "../variants";
import { todoListState } from "./context";

let { title = "To-dos", class: classProp }: { title?: string; class?: string } = $props();
const ctx = todoListState("TodoListTrigger");
const s = $derived(ctx.styles);
</script>

<!-- The header: an icon that turns into a tick when all are done, the title and "2/5". -->
<CollapsiblePrimitive.Trigger data-slot="todo-list-trigger" class={cn(s.trigger(), classProp)}>
	<span aria-hidden="true" class={s.headerIcon()}>
		<svg viewBox="0 0 24 24" aria-hidden="true" class={s.listIcon()}><path d={TODO_ICONS.list} /></svg>
		<svg viewBox="0 0 24 24" aria-hidden="true" class={s.doneIcon()}>
			<circle cx="12" cy="12" r="9" fill="currentColor" />
			<path d={TODO_ICONS.check} pathLength="1" fill="none" stroke="white" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</span>
	<span class={s.title()}>{title}</span>
	<span class={s.count()}>
		<span class="sr-only">{ctx.completed} of {ctx.items.length} tasks completed</span>
		<span aria-hidden="true" class="inline-flex"><RollingDigits value={ctx.completed} />/{ctx.items.length}</span>
	</span>
	<svg viewBox="0 0 24 24" aria-hidden="true" class={s.chevron()}><path d={TODO_ICONS.chevron} /></svg>
</CollapsiblePrimitive.Trigger>
