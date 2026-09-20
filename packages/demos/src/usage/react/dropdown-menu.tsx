import { DropdownMenu } from "@baby-ui/react";

const items = [
	{ id: "profile", label: "Profile" },
	{ id: "team", label: "Team settings" },
	{ id: "logout", label: "Sign out" },
];

export function Example() {
	return (
		<DropdownMenu
			items={items}
			trigger={<span>Account</span>}
			onSelect={(id) => console.log(id)}
		/>
	);
}
