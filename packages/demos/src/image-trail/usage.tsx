import { ImageTrail } from "@baby-ui/react";

const images = [
	"https://picsum.photos/id/10/300/400",
	"https://picsum.photos/id/11/300/400",
	"https://picsum.photos/id/15/300/400",
];

export function Example() {
	return <ImageTrail images={images} variant="fall" />;
}
