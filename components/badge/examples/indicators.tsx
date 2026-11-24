import { Avatar, AvatarFallback } from "@baby-ui/components/react/avatar";
import { Badge, BadgeAnchor } from "@baby-ui/components/react/badge";

const DOTS = ["default", "success", "warning", "destructive"] as const;
const COUNTS = ["5", "New", "99+"] as const;

function Host() {
	return (
		<Avatar>
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	);
}

export default function BadgeIndicators() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-6">
				{DOTS.map((variant) => (
					<BadgeAnchor key={variant}>
						<Host />
						<Badge
							variant={variant}
							fill="solid"
							size="sm"
							placement="bottom-right"
							aria-label={variant}
						/>
					</BadgeAnchor>
				))}
			</div>
			<div className="flex items-center gap-6">
				{COUNTS.map((count) => (
					<BadgeAnchor key={count}>
						<Host />
						<Badge variant="destructive" fill="solid" size="sm" placement="top-right">
							{count}
						</Badge>
					</BadgeAnchor>
				))}
			</div>
		</div>
	);
}
