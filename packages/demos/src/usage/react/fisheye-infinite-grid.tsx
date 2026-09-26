import { FisheyeInfiniteGrid } from "@baby-ui/react";

const items = [
	{ src: "/work/one.jpg", alt: "Studio portrait", title: "Portrait", caption: "2024" },
	{ src: "/work/two.jpg", alt: "Coastline at dawn", title: "Coast", caption: "2025" },
];

export function Example() {
	return <FisheyeInfiniteGrid items={items} />;
}
