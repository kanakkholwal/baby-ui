import { LayeredStack } from "@baby-ui/react";
import { useState } from "react";

const items = [
	{ src: "/photos/1.jpg", alt: "Harbour at dawn" },
	{ src: "/photos/2.jpg", alt: "Pine ridge" },
	{ src: "/photos/3.jpg", alt: "Desert road" },
	{ src: "/photos/4.jpg", alt: "City lights" },
];

export function Example() {
	const [open, setOpen] = useState(false);
	return <LayeredStack items={items} open={open} onOpenChange={setOpen} columns="4" />;
}
