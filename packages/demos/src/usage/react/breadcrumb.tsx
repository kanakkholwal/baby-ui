import { Breadcrumb } from "@baby-ui/react";

const items = [
	{ href: "/", label: "Home" },
	{ href: "/components", label: "Components" },
	{ label: "Breadcrumb" },
];

export function Example() {
	return <Breadcrumb items={items} maxVisible={4} />;
}
