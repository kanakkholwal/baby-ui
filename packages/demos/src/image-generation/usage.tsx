"use client";

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
} from "@baby-ui/react";

export function Example({
	status,
	src,
	prompt,
	retry,
}: {
	status: ImageGenerationPhase;
	src?: string;
	prompt: string;
	retry: () => void;
}) {
	return (
		<ImageGeneration status={status}>
			<ImageGenerationFrame label={prompt}>
				<ImageGenerationMedia>{src && <img src={src} alt="" />}</ImageGenerationMedia>
				<ImageGenerationField />
				<ImageGenerationBadge>1024 × 1024</ImageGenerationBadge>
			</ImageGenerationFrame>
			<ImageGenerationCaption>
				<ImageGenerationStatus />
				<ImageGenerationPrompt>{prompt}</ImageGenerationPrompt>
			</ImageGenerationCaption>
			<ImageGenerationRetry onClick={retry} />
		</ImageGeneration>
	);
}
