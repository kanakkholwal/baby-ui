import { InfiniteImageField } from "@baby-ui/react";

const images = ["/photos/one.jpg", "/photos/two.jpg", "/photos/three.jpg"];

export function Example() {
	return <InfiniteImageField images={images} />;
}
