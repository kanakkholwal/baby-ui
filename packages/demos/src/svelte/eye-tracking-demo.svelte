<script lang="ts">
import {
	EyeTracking,
	type EyeTrackingSize,
	type EyeTrackingVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<EyeTracking
	variant={(props.variant as EyeTrackingVariant) ?? "realistic"}
	size={(props.size as EyeTrackingSize) ?? "md"}
	eyeCount={Number(props.eyeCount ?? 2)}
	pupilRange={Number(props.pupilRange ?? 0.7)}
	blink={props.blink !== false}
	blinkInterval={Number(props.blinkInterval ?? 4000)}
	reactivePupil={props.reactivePupil !== false}
	reflection={props.reflection !== false}
/>
