<script lang="ts">
import {
	ImageGeneration,
	ImageGenerationBadge,
	ImageGenerationCaption,
	ImageGenerationField,
	ImageGenerationFrame,
	ImageGenerationMedia,
	type ImageGenerationPhase,
	ImageGenerationPrompt,
	ImageGenerationRetry,
	ImageGenerationStatus,
} from "@baby-ui/svelte";

let {
	status,
	src,
	prompt,
	retry,
}: { status: ImageGenerationPhase; src?: string; prompt: string; retry: () => void } =
	$props();
</script>

<ImageGeneration {status}>
	<ImageGenerationFrame label={prompt}>
		<ImageGenerationMedia>{#if src}<img {src} alt="" />{/if}</ImageGenerationMedia>
		<ImageGenerationField />
		<ImageGenerationBadge>1024 × 1024</ImageGenerationBadge>
	</ImageGenerationFrame>
	<ImageGenerationCaption>
		<ImageGenerationStatus />
		<ImageGenerationPrompt>{prompt}</ImageGenerationPrompt>
	</ImageGenerationCaption>
	<ImageGenerationRetry onclick={retry} />
</ImageGeneration>
