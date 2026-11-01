<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { cn } from "../../lib/cn";
import { arcOffset, TODO_ICONS, TODO_STATUS_TEXT } from "../variants";
import { todoListState } from "./context";

let {
	maxHeight = 248,
	emptyText = "No tasks yet",
	class: classProp,
}: { maxHeight?: number; emptyText?: string; class?: string } = $props();
const ctx = todoListState("TodoListContent");
const s = $derived(ctx.styles);
let viewport = $state<HTMLDivElement>();
let seen = ctx.items.length;

// A newly added task scrolls into view.
$effect(() => {
	const count = ctx.items.length;
	if (!viewport || count <= seen) {
		seen = count;
		return;
	}
	seen = count;
	const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
	const node = viewport;
	requestAnimationFrame(() =>
		node.scrollTo({ top: node.scrollHeight, behavior: reduce ? "auto" : "smooth" }),
	);
});
</script>

<!-- forceMount keeps a closed frame for the grid-rows transition to animate from. -->
<CollapsiblePrimitive.Content forceMount data-slot="todo-list-content" class={s.panel()}>
	<div class={s.clip()}>
		<div bind:this={viewport} style:max-height="{maxHeight}px" class={cn(s.viewport(), classProp)}>
			{#if ctx.items.length}
				<ol aria-live="polite" class={s.list()}>
					{#each ctx.items as item (item.id)}
						{@const status = item.status ?? "pending"}
						<li data-slot="todo-list-item" data-status={status} class={s.item()}>
							<svg aria-hidden="true" viewBox="0 0 24 24" data-status={status} class={s.status()}>
								<circle cx="12" cy="12" r="9" data-status={status} class={s.ring()} />
								<circle cx="12" cy="12" r="9" pathLength="1" data-status={status} data-spin={(status === "in-progress" && item.progress === undefined) || undefined} style:stroke-dashoffset={arcOffset(status, item.progress)} class={s.arc()} />
								<path d={TODO_ICONS.check} pathLength="1" data-on={status === "completed" || undefined} class={s.tick()} />
								<path d={TODO_ICONS.cross} pathLength="1" data-on={status === "cancelled" || undefined} class={s.tick()} />
							</svg>
							<span class="sr-only">{TODO_STATUS_TEXT[status]}: </span>
							<span data-status={status} class={s.label()}>
								<span class={s.strike()}>{item.title}<span aria-hidden="true" data-on={status === "completed" || undefined} class={s.line()}></span></span>
							</span>
							{#if item.detail}<span class={s.detail()}>{item.detail}</span>{/if}
						</li>
					{/each}
				</ol>
			{:else}
				<p class={s.empty()}>{emptyText}</p>
			{/if}
		</div>
	</div>
</CollapsiblePrimitive.Content>
