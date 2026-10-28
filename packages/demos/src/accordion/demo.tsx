"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const ACCORDION_ITEMS = [
	{
		id: "install",
		title: "How do I install a component?",
		content:
			"Run the CLI command on the Install tab. It copies the source into your project.",
	},
	{
		id: "own",
		title: "Do I own the code?",
		content:
			"Yes. Nothing is imported from a package at runtime, so you can edit any file freely.",
	},
	{
		id: "update",
		title: "How do updates work?",
		content: "Re-run the add command. The CLI will show you a diff before overwriting.",
	},
];

export function AccordionDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Accordion>>(props);
	const type = p.type ?? "single";
	const [value, setValue] = useState<string | string[]>("install");
	// Switching modes changes the value's shape, so it is reseeded rather than coerced.
	useEffect(() => setValue(type === "multiple" ? ["install"] : "install"), [type]);
	return (
		<div className="w-full max-w-md">
			<Accordion
				type={type}
				motion={p.motion}
				collapsible={p.collapsible !== false}
				value={value}
				onValueChange={setValue}
			>
				{ACCORDION_ITEMS.map((item) => (
					<AccordionItem key={item.id} value={item.id}>
						<AccordionTrigger>{item.title}</AccordionTrigger>
						<AccordionContent>{item.content}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
