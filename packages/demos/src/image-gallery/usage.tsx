import { ImageGallery, ImageGalleryGrid } from "@baby-ui/react";

const images = [
	{ src: "/photos/one.jpg", alt: "A harbour at dawn", width: 1600, height: 1000 },
	{ src: "/photos/two.jpg", alt: "A street market", width: 1000, height: 1400 },
];

export function Example() {
	return (
		<ImageGallery images={images} onOpen={(index) => console.log("open", index)}>
			<ImageGalleryGrid />
		</ImageGallery>
	);
}
