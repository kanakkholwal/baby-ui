import { Badge } from "@baby-ui/components/react/badge";

const info = (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="9" />
		<path d="M12 11v5M12 8h.01" />
	</svg>
);
const check = (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="m5 12 5 5 9-10" />
	</svg>
);
const warn = (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M12 4 3 20h18L12 4ZM12 10v4M12 17h.01" />
	</svg>
);

export default function BadgeIcons() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="info">
				{info}
				New feature
			</Badge>
			<Badge variant="success">
				{check}
				Available
			</Badge>
			<Badge variant="warning">
				{warn}
				Beta
			</Badge>
			<Badge variant="success" fill="solid">
				{check}
				Verified
			</Badge>
		</div>
	);
}
