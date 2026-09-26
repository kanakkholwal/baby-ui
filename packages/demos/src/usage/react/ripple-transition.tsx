import { RippleTransition } from "@baby-ui/react";
import { useState } from "react";

const images = [
	{ src: "/photos/valley.jpg", alt: "Mountain valley" },
	{ src: "/photos/forest.jpg", alt: "Forest path" },
];

export function Example() {
	const [index, setIndex] = useState(0);
	return <RippleTransition images={images} value={index} onValueChange={setIndex} />;
}
