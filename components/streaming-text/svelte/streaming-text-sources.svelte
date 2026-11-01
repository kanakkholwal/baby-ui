<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { cn } from "../../lib/cn";
import { streamingTextState } from "./context";

let {
	label,
	open = $bindable(false),
	onOpenChange,
	class: classProp,
}: {
	/** Defaults to "3 sources". */
	label?: string;
	/** Whether the list shows; bindable. */
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	class?: string;
} = $props();
const ctx = streamingTextState("StreamingTextSources");
const s = $derived(ctx.styles);
</script>

<!-- A favicon stack that opens the cited sources as a list of links. -->
{#if ctx.sources.length}
	<CollapsiblePrimitive.Root
		bind:open={
			() => open,
			(next) => {
				open = next;
				onOpenChange?.(next);
			}
		}
		class={s.sources()}
	>
		<CollapsiblePrimitive.Trigger data-slot="streaming-text-sources" class={cn(s.sourcesTrigger(), classProp)}>
			<span class={s.favicons()}>
				{#each ctx.sources as source (source.href)}<img src={source.image} alt="" class={s.favicon()} />{/each}
			</span>
			<span class={s.sourcesLabel()}>{label ?? `${ctx.sources.length} source${ctx.sources.length === 1 ? "" : "s"}`}</span>
		</CollapsiblePrimitive.Trigger>
		<!-- forceMount keeps a closed frame for the grid-rows transition to animate from. -->
		<CollapsiblePrimitive.Content forceMount class={s.panel()}>
			<div class={s.clip()}>
				<div class={s.list()}>
					{#each ctx.sources as source (source.href)}
						<a href={source.href} target="_blank" rel="noreferrer" class={s.source()}>
							<img src={source.image} alt="" class={s.sourceImage()} />
							<span>{source.name}</span>
							<span class={s.sourceDomain()}>{source.domain}</span>
						</a>
					{/each}
				</div>
			</div>
		</CollapsiblePrimitive.Content>
	</CollapsiblePrimitive.Root>
{/if}
