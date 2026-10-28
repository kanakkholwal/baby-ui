import { Avatar, AvatarFallback, AvatarImage } from "@baby-ui/react";

export function Example() {
	return (
		<div className="flex items-center gap-2">
			<Avatar size="sm">
				<AvatarFallback>AL</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>GH</AvatarFallback>
				<AvatarImage src="https://i.pravatar.cc/160?img=47" alt="Grace Hopper" />
			</Avatar>
			<Avatar size="lg" shape="square">
				<AvatarFallback>AT</AvatarFallback>
			</Avatar>
		</div>
	);
}
