import { Skeleton } from "@baby-ui/react";

export function Example() {
	return (
		<div className="flex items-center gap-3">
			<Skeleton shape="circle" width="2.5rem" height="2.5rem" />
			<div className="flex flex-1 flex-col gap-2">
				<Skeleton width="60%" />
				<Skeleton width="40%" />
			</div>
		</div>
	);
}
