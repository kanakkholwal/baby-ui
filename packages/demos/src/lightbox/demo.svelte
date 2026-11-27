<script lang="ts">
import {
	Lightbox,
	LightboxBody,
	LightboxClose,
	LightboxContent,
	LightboxCounter,
	LightboxDetails,
	LightboxDetailsToggle,
	LightboxFilmstrip,
	LightboxMinimap,
	LightboxNext,
	LightboxPrevious,
	LightboxStage,
	LightboxToolbar,
	LightboxTrigger,
	LightboxZoom,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { LIGHTBOX_SAMPLES } from "../data/lightbox";
import { controlProps } from "../data/preview-props";
import Facts from "./facts.svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Lightbox>>(props));
</script>

<Lightbox images={LIGHTBOX_SAMPLES} variant={p.variant} loop={p.loop}>
	<div class="grid w-full max-w-md grid-cols-3 gap-2">
		{#each LIGHTBOX_SAMPLES.slice(0, 6) as image, index (image.src)}
			<LightboxTrigger {index} aria-label={`Open ${image.alt}`}>
				<img src={image.src} alt="" class="block aspect-[4/3] w-full rounded-lg object-cover" />
			</LightboxTrigger>
		{/each}
	</div>
	<LightboxContent>
		<LightboxToolbar>
			<LightboxPrevious />
			<LightboxCounter />
			<LightboxNext />
			<LightboxZoom class="mx-auto" />
			<LightboxDetailsToggle />
			<LightboxClose />
		</LightboxToolbar>
		<LightboxBody>
			<LightboxStage />
					<LightboxMinimap />
			<LightboxDetails>
				<Facts />
			</LightboxDetails>
		</LightboxBody>
		<LightboxFilmstrip />
	</LightboxContent>
</Lightbox>
