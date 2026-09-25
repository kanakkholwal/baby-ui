<script lang="ts">
import { MorphingModal, type MorphSpring } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";

type MorphingModalSize = NonNullable<ComponentProps<typeof MorphingModal>["size"]>;

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<MorphingModal
	title="Deploy to production"
	spring={(props.spring as MorphSpring) ?? "gentle"}
	size={(props.size as MorphingModalSize) ?? "md"}
	dismissOnBackdrop={props.dismissOnBackdrop !== false}
	backdropBlur={Number(props.backdropBlur ?? 8)}
>
	{#snippet trigger()}
		<div class="w-56 rounded-2xl border border-border bg-card p-4">
			<p class="font-medium text-foreground text-sm">Deploy to production</p>
			<p class="mt-1 text-muted-foreground text-xs">Click to expand</p>
		</div>
	{/snippet}
	This dialog grew out of the card's own box. Closing runs the same path in reverse, a
	little faster.
</MorphingModal>
