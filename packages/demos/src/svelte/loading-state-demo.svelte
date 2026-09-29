<script lang="ts">
import { LoadingState } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof LoadingState>>(props));

const SURFER_VIDEO =
	"https://95dnc2a95qgwt9ff.public.blob.vercel-storage.com/subway-surfers.mp4";

const variant = $derived(p.variant ?? "drive");
</script>

<LoadingState
	{variant}
	label={p.label || undefined}
	videoSrc={variant === "surfer" ? SURFER_VIDEO : undefined}
/>
