import {
	Button,
	ImageViewer,
	ImageViewerBody,
	ImageViewerClose,
	ImageViewerContent,
	ImageViewerCounter,
	ImageViewerFilmstrip,
	ImageViewerNext,
	ImageViewerPrevious,
	ImageViewerStage,
	ImageViewerToolbar,
	ImageViewerTrigger,
	ImageViewerZoom,
} from "@baby-ui/react";

const images = [
	{ src: "/photos/one.jpg", alt: "A harbour at dawn" },
	{ src: "/photos/two.jpg", alt: "A street market" },
];

export function Example() {
	return (
		<ImageViewer images={images}>
			<ImageViewerTrigger render={<Button variant="outline">Open</Button>} />
			<ImageViewerContent>
				<ImageViewerToolbar>
					<ImageViewerPrevious />
					<ImageViewerCounter />
					<ImageViewerNext />
					<ImageViewerZoom className="mx-auto" />
					<ImageViewerClose />
				</ImageViewerToolbar>
				<ImageViewerBody>
					<ImageViewerStage />
				</ImageViewerBody>
				<ImageViewerFilmstrip />
			</ImageViewerContent>
		</ImageViewer>
	);
}
