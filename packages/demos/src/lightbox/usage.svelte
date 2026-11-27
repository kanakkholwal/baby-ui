<script lang="ts">
import {
	Lightbox,
	LightboxBody,
	LightboxClose,
	LightboxContent,
	LightboxCounter,
	LightboxFilmstrip,
	LightboxNext,
	LightboxPrevious,
	LightboxStage,
	LightboxToolbar,
	LightboxTrigger,
	LightboxZoom,
} from "@baby-ui/svelte";

const images = [
	{ src: "/photos/one.jpg", alt: "A harbour at dawn" },
	{ src: "/photos/two.jpg", alt: "A street market" },
];
</script>

<Lightbox {images}>
	<div class="grid w-full max-w-md grid-cols-3 gap-2">
		{#each images as image, index (image.src)}
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
			<LightboxClose />
		</LightboxToolbar>
		<LightboxBody>
			<LightboxStage />
		</LightboxBody>
		<LightboxFilmstrip />
	</LightboxContent>
</Lightbox>
