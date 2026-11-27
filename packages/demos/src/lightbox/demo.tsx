"use client";

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
	LightboxTitle,
	LightboxToolbar,
	LightboxTrigger,
	LightboxZoom,
	useLightbox,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { LIGHTBOX_SAMPLES } from "../data/lightbox";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

function Facts() {
	const { image, index, count } = useLightbox();
	return (
		<>
			<LightboxTitle className="text-sm font-medium">{image?.alt}</LightboxTitle>
			<dl className="grid gap-2 text-sm">
				<div className="flex justify-between gap-3">
					<dt className="opacity-60">Picture</dt>
					<dd className="tabular-nums">
						{index + 1} of {count}
					</dd>
				</div>
				<div className="flex justify-between gap-3">
					<dt className="opacity-60">Size</dt>
					<dd className="tabular-nums">
						{image?.width} × {image?.height}
					</dd>
				</div>
			</dl>
		</>
	);
}

export function LightboxDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Lightbox>>(props);
	return (
		<Lightbox images={LIGHTBOX_SAMPLES} variant={p.variant} loop={p.loop}>
			<div className="grid w-full max-w-md grid-cols-3 gap-2">
				{LIGHTBOX_SAMPLES.slice(0, 6).map((image, index) => (
					<LightboxTrigger key={image.src} index={index} aria-label={`Open ${image.alt}`}>
						<img
							src={image.src}
							alt=""
							className="block aspect-[4/3] w-full rounded-lg object-cover"
						/>
					</LightboxTrigger>
				))}
			</div>
			<LightboxContent>
				<LightboxToolbar>
					<LightboxPrevious />
					<LightboxCounter />
					<LightboxNext />
					<LightboxZoom className="mx-auto" />
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
	);
}
