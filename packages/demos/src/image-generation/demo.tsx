"use client";

import {
	Button,
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
import { type ComponentProps, useCallback, useEffect, useRef, useState } from "react";
import { PRODUCT_SHOTS } from "../data/media";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const shot = PRODUCT_SHOTS.payments;
const prompt = "A payments dashboard with recent transfers, calm and light";

export function ImageGenerationDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ImageGeneration>>(props);
	// The demo plays a request: queued, generating, refining, then done or failed.
	const [status, setStatus] = useState<ImageGenerationPhase>("queued");
	const timers = useRef<number[]>([]);
	const run = useCallback((fail = false) => {
		for (const t of timers.current) clearTimeout(t);
		setStatus("queued");
		const steps: [number, ImageGenerationPhase][] = fail
			? [
					[700, "generating"],
					[2600, "error"],
				]
			: [
					[700, "generating"],
					[2600, "refining"],
					[4200, "complete"],
				];
		timers.current = steps.map(([at, next]) =>
			window.setTimeout(() => setStatus(next), at),
		);
	}, []);
	useEffect(() => {
		run();
		return () => {
			for (const t of timers.current) clearTimeout(t);
		};
	}, [run]);
	// The default status plays the script; any other status in the controls holds it.
	const picked = useRef<string | undefined>("generating");
	useEffect(() => {
		if (p.status === picked.current) return;
		picked.current = p.status;
		if (!p.status) return;
		for (const t of timers.current) clearTimeout(t);
		setStatus(p.status);
	}, [p.status]);

	return (
		<div className="flex w-full max-w-sm flex-col items-center gap-4">
			<ImageGeneration status={status} variant={p.variant ?? "fluid"}>
				<ImageGenerationFrame
					label={status === "complete" ? shot.alt : prompt}
					aspectRatio={`${shot.width} / ${shot.height}`}
				>
					<ImageGenerationMedia>
						<img src={shot.light} alt="" className="dark:hidden" />
						<img src={shot.dark} alt="" className="hidden dark:block" />
					</ImageGenerationMedia>
					<ImageGenerationField />
					<ImageGenerationBadge>1600 × 900</ImageGenerationBadge>
				</ImageGenerationFrame>
				<ImageGenerationCaption>
					<ImageGenerationStatus />
					<ImageGenerationPrompt>{prompt}</ImageGenerationPrompt>
				</ImageGenerationCaption>
				<ImageGenerationRetry onClick={() => run()} />
			</ImageGeneration>
			<div className="flex gap-2">
				<Button
					size="sm"
					variant="secondary"
					className="rounded-full"
					onClick={() => run()}
				>
					Generate again
				</Button>
				<Button
					size="sm"
					variant="ghost"
					className="rounded-full"
					onClick={() => run(true)}
				>
					Fail a run
				</Button>
			</div>
		</div>
	);
}
