"use client";

import {
	Button,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
	ImageGallery,
	ImageGalleryEmpty,
	ImageGalleryGrid,
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
	LightboxZoom,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { IMAGE_GALLERY_SAMPLES } from "../data/lightbox";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function ImageGalleryDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ImageGallery>>(props);
	const [images, setImages] = useState(IMAGE_GALLERY_SAMPLES);
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);

	return (
		<div className="grid w-full max-w-3xl gap-4">
			<div className="flex justify-end">
				<Button
					variant="outline"
					size="sm"
					onClick={() => setImages(images.length ? [] : IMAGE_GALLERY_SAMPLES)}
				>
					{images.length ? "Clear pictures" : "Restore pictures"}
				</Button>
			</div>
			<ImageGallery
				images={images}
				variant={p.variant}
				selectable={p.selectable}
				columnWidth={p.columnWidth}
				onOpen={(next) => {
					setIndex(next);
					setOpen(true);
				}}
			>
				<ImageGalleryGrid />
				<ImageGalleryEmpty>
					<EmptyHeader>
						<EmptyTitle>No pictures yet</EmptyTitle>
						<EmptyDescription>Pictures you add show up here.</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button onClick={() => setImages(IMAGE_GALLERY_SAMPLES)}>Add pictures</Button>
					</EmptyContent>
				</ImageGalleryEmpty>
			</ImageGallery>
			<Lightbox
				images={images}
				open={open}
				onOpenChange={setOpen}
				index={index}
				onIndexChange={setIndex}
				origin={(index) =>
					document.querySelector(`[data-slot=image-gallery-item][data-index="${index}"]`)
				}
			>
				<LightboxContent>
					<LightboxToolbar>
						<LightboxPrevious />
						<LightboxCounter />
						<LightboxNext />
						<LightboxZoom className="mx-auto" />
						<LightboxClose />
					</LightboxToolbar>
					<LightboxBody>
						<LightboxStage />
					</LightboxBody>
					<LightboxFilmstrip />
				</LightboxContent>
			</Lightbox>
		</div>
	);
}
