<script lang="ts">
import { LoadingState, type LoadingStateVariant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const SURFER_VIDEO =
	"https://95dnc2a95qgwt9ff.public.blob.vercel-storage.com/subway-surfers.mp4";

const variant = $derived((props.variant as LoadingStateVariant) ?? "drive");
</script>

<LoadingState
	{variant}
	label={(props.label as string) || undefined}
	videoSrc={variant === "surfer" ? SURFER_VIDEO : undefined}
/>
