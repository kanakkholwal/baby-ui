<script lang="ts">
import { cn } from "../../lib/cn";
import { createRail, type RailState } from "../rail";
import { conversationRail } from "../variants";
import { getConversation } from "./context";

let {
	label = (index: number) => `Message ${index + 1}`,
	class: classProp,
}: {
	/** Names each tick, e.g. the speaker; defaults to "Message 3". */
	label?: (index: number) => string;
	class?: string;
} = $props();
const conversation = getConversation();
const styles = conversationRail();
let state = $state<RailState>({ count: 0, active: -1 });
let rail: ReturnType<typeof createRail> | undefined;

$effect(() => {
	const viewport = conversation.viewport;
	if (!viewport) return;
	const created = createRail(viewport, (next) => {
		state = next;
	});
	rail = created;
	return () => created.destroy();
});
</script>

<!-- A tick per message down the right edge: the current one widens, and a tick jumps to its message. -->
{#if state.count > 1}
	<nav data-slot="conversation-rail" aria-label="Messages" class={cn(styles.root(), classProp)}>
		{#each { length: state.count } as _, i (i)}
			<button
				type="button"
				aria-label={label(i)}
				aria-current={i === state.active ? "location" : undefined}
				data-active={i === state.active || undefined}
				onclick={() => rail?.jump(i)}
				class={styles.tick()}
			>
				<span aria-hidden="true" class={styles.bar()}></span>
			</button>
		{/each}
	</nav>
{/if}
