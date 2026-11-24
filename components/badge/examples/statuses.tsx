import { Badge } from "@baby-ui/components/react/badge";

const STATUSES = [
	{ variant: "secondary", label: "Default" },
	{ variant: "success", label: "Active" },
	{ variant: "warning", label: "Pending" },
	{ variant: "destructive", label: "Inactive" },
] as const;

export default function BadgeStatuses() {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-wrap items-center gap-2">
				{STATUSES.map((status) => (
					<Badge key={status.label} variant={status.variant} fill="solid" dot>
						{status.label}
					</Badge>
				))}
			</div>
			<div className="flex flex-wrap items-center gap-2">
				{STATUSES.map((status) => (
					<Badge key={status.label} variant={status.variant} dot>
						{status.label}
					</Badge>
				))}
			</div>
		</div>
	);
}
