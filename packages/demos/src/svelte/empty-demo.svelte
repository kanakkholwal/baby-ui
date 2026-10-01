<script lang="ts">
import {
	Button,
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { EMPTY_SCENES, isEmptyScene } from "../data/empty";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Empty>>(props));
const media = $derived(controlProps<ComponentProps<typeof EmptyMedia>>(props));
const scene = $derived(EMPTY_SCENES[isEmptyScene(props.scene) ? props.scene : "search"]);
</script>

<Empty variant={p.variant ?? "outline"} layout={p.layout ?? "vertical"} size={p.size ?? "md"} class="max-w-xl">
	<EmptyHeader>
		<EmptyMedia variant="icon" tone={media.tone ?? scene.tone}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d={scene.icon} />
			</svg>
		</EmptyMedia>
		<EmptyTitle>{scene.title}</EmptyTitle>
		<EmptyDescription>{scene.description}</EmptyDescription>
	</EmptyHeader>
	<EmptyContent>
		<Button size="sm" variant={scene.tone === "primary" ? "default" : "outline"}>{scene.action}</Button>
	</EmptyContent>
</Empty>
