import { Avatar, AvatarFallback } from "@baby-ui/components/react/avatar";
import { Badge, BadgeAnchor } from "@baby-ui/components/react/badge";

const PLACEMENTS = ["top-right", "top-left", "bottom-right", "bottom-left"] as const;

export default function BadgePlacements() {
	return (
		<div className="flex items-center gap-8">
			{PLACEMENTS.map((placement) => (
				<div key={placement} className="flex flex-col items-center gap-2">
					<BadgeAnchor>
						<Avatar>
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<Badge fill="solid" size="sm" placement={placement} aria-label={placement} />
					</BadgeAnchor>
					<span className="text-muted-foreground text-xs">{placement}</span>
				</div>
			))}
		</div>
	);
}
