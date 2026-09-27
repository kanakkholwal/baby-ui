<script lang="ts">
import {
	Button,
	DotMatrixGlow,
	type DotMatrixGlowShape,
	type DotMatrixGlowSize,
	type DotMatrixGlowTone,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-96 w-full max-w-3xl overflow-hidden rounded-xl border border-border">
	<DotMatrixGlow
		position="absolute"
		shape={(props.shape as DotMatrixGlowShape) ?? "dot"}
		size={(props.size as DotMatrixGlowSize) ?? "md"}
		tone={(props.tone as DotMatrixGlowTone) ?? "primary"}
		glowRadius={Number(props.glowRadius ?? 160)}
		ripple={props.ripple !== false}
		ambient={props.ambient === true}
	>
		<div class="flex size-full flex-col items-center justify-center gap-5 px-6 text-center">
			<p class="font-medium text-muted-foreground text-xs uppercase tracking-widest">
				Observability for AI agents
			</p>
			<h2 class="max-w-md text-balance font-semibold text-3xl text-foreground tracking-tight">
				See every step your agents take
			</h2>
			<div class="flex gap-3">
				<Button>Start free trial</Button>
				<Button variant="outline">Book a demo</Button>
			</div>
		</div>
	</DotMatrixGlow>
</div>
