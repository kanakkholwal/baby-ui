import { Badge } from "@baby-ui/components/react/badge";

const VARIANTS = [
	"default",
	"secondary",
	"outline",
	"success",
	"warning",
	"destructive",
	"info",
	"gold",
] as const;
const FILLS = ["soft", "solid", "ghost"] as const;

export default function BadgeFills() {
	return (
		<div className="flex flex-col gap-3">
			{FILLS.map((fill) => (
				<div key={fill} className="flex flex-wrap items-center gap-2">
					{VARIANTS.map((variant) => (
						<Badge key={variant} variant={variant} fill={fill}>
							{variant}
						</Badge>
					))}
				</div>
			))}
		</div>
	);
}
