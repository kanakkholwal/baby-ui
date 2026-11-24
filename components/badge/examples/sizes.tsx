import { Badge } from "@baby-ui/components/react/badge";

const SIZES = ["sm", "default", "lg", "xl"] as const;

export default function BadgeSizes() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			{SIZES.map((size) => (
				<Badge key={size} size={size}>
					{size}
				</Badge>
			))}
		</div>
	);
}
