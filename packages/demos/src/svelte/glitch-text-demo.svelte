<script lang="ts">
import {
	GlitchText,
	type GlitchTextBlendMode,
	type GlitchTextSize,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<GlitchText
	text={(props.text as string) || "Glitch"}
	size={(props.size as GlitchTextSize) ?? "md"}
	intensity={Number(props.intensity ?? 5)}
	durationSeconds={Number(props.durationSeconds ?? 2.5)}
	baseColor={(props.baseColor as string) || undefined}
	colorA={(props.colorA as string) || undefined}
	colorB={(props.colorB as string) || undefined}
	blendMode={(props.blendMode as GlitchTextBlendMode) ?? "screen"}
	class="text-foreground"
/>
