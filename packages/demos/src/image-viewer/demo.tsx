"use client";

import {
	Button,
	ImageViewer,
	ImageViewerBody,
	ImageViewerClose,
	ImageViewerContent,
	ImageViewerCounter,
	ImageViewerDetails,
	ImageViewerDetailsToggle,
	ImageViewerFilmstrip,
	ImageViewerMinimap,
	ImageViewerNext,
	ImageViewerPrevious,
	ImageViewerStage,
	ImageViewerTitle,
	ImageViewerToolbar,
	ImageViewerTrigger,
	ImageViewerZoom,
	useImageViewer,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { IMAGE_VIEWER_SAMPLES } from "../data/image-viewer";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

function Facts() {
	const { image, index, count } = useImageViewer();
	return (
		<>
			<ImageViewerTitle className="text-sm font-medium">{image?.alt}</ImageViewerTitle>
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

export function ImageViewerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ImageViewer>>(props);
	return (
		<ImageViewer images={IMAGE_VIEWER_SAMPLES} variant={p.variant} loop={p.loop}>
			<ImageViewerTrigger render={<Button variant="outline">Open viewer</Button>} />
			<ImageViewerContent>
				<ImageViewerToolbar>
					<ImageViewerPrevious />
					<ImageViewerCounter />
					<ImageViewerNext />
					<ImageViewerZoom className="mx-auto" />
					<ImageViewerDetailsToggle />
					<ImageViewerClose />
				</ImageViewerToolbar>
				<ImageViewerBody>
					<ImageViewerStage />
					<ImageViewerMinimap />
					<ImageViewerDetails>
						<Facts />
					</ImageViewerDetails>
				</ImageViewerBody>
				<ImageViewerFilmstrip />
			</ImageViewerContent>
		</ImageViewer>
	);
}
