import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@baby-ui/react";

export function Example() {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="own">
				<AccordionTrigger>Do I own the code?</AccordionTrigger>
				<AccordionContent>Yes. Components are copied into your project.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="update">
				<AccordionTrigger>How do updates work?</AccordionTrigger>
				<AccordionContent>Re-run the add command and diff the result.</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
