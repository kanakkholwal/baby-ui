import { Button, Navbar } from "@baby-ui/react";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/docs", label: "Docs" },
];

export function Example() {
	return (
		<Navbar
			links={links}
			active="/"
			brand={<span className="font-semibold">acme</span>}
			actions={<Button size="sm">Sign in</Button>}
		/>
	);
}
