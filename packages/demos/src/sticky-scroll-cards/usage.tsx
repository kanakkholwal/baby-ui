import { StickyScrollCards } from "@baby-ui/react";

const cards = [
	{ title: "Misty Alps", src: "/photos/alps.jpg" },
	{ title: "Quiet Shore", src: "/photos/shore.jpg" },
	{ title: "Rolling Hills", src: "/photos/hills.jpg" },
];

export function Example() {
	return <StickyScrollCards cards={cards} />;
}
