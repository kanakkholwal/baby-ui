import { Avatar } from "@baby-ui/react";

export function Example() {
	return (
		<div className="flex items-center gap-2">
			<Avatar name="Ada Lovelace" size="sm" />
			<Avatar name="Grace Hopper" src="/grace.jpg" />
			<Avatar name="Alan Turing" size="lg" shape="square" />
		</div>
	);
}
