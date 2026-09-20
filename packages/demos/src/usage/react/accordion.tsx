import { Accordion } from "@baby-ui/react";

const items = [
	{ id: "own", title: "Do I own the code?", content: "Yes. Components are copied into your project." },
	{ id: "update", title: "How do updates work?", content: "Re-run the add command and diff the result." },
];

export function Example() {
	return <Accordion items={items} collapsible />;
}
