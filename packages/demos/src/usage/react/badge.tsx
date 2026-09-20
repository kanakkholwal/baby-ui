import { Badge } from "@baby-ui/react";

export function Example() {
	return (
		<div className="flex items-center gap-2">
			<Badge>Draft</Badge>
			<Badge variant="success" dot>
				Live
			</Badge>
			<Badge variant="outline" size="sm">
				v2.1
			</Badge>
		</div>
	);
}
