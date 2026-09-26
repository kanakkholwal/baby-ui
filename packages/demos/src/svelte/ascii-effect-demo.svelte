<script lang="ts">
import {
	AsciiEffect,
	type AsciiEffectDither,
	type AsciiEffectFit,
	type AsciiEffectTone,
	type AsciiEffectVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<AsciiEffect
		position="absolute"
		src="https://picsum.photos/id/1025/800/600"
		alt="A pug wrapped in a blanket"
		variant={(props.variant as AsciiEffectVariant) ?? "image"}
		tone={(props.tone as AsciiEffectTone) ?? "mono"}
		dither={(props.dither as AsciiEffectDither) ?? "floyd-steinberg"}
		fit={(props.fit as AsciiEffectFit) ?? "cover"}
		chars={(props.chars as string) || " .:-=+*#%@"}
		fontSize={Number(props.fontSize ?? 10)}
		contrast={Number(props.contrast ?? 1.1)}
		brightness={Number(props.brightness ?? 1.2)}
		invert={props.invert === true}
		speed={Number(props.speed ?? 1)}
	/>
</div>
