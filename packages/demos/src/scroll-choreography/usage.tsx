"use client";

import { ScrollChoreography } from "@baby-ui/react";

const images = {
	topLeft: { src: "https://picsum.photos/id/1015/800/540", alt: "Canyon river" },
	topRight: { src: "https://picsum.photos/id/1036/1600/1000", alt: "Snowy forest" },
	bottomLeft: { src: "https://picsum.photos/id/1043/800/540", alt: "Autumn lake" },
	bottomRight: { src: "https://picsum.photos/id/1039/800/540", alt: "Waterfall" },
};

export function Example() {
	return <ScrollChoreography images={images} />;
}
