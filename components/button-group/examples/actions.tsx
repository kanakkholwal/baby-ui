import { Badge } from "@baby-ui/components/react/badge";
import { Button } from "@baby-ui/components/react/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@baby-ui/components/react/button-group";

const PATHS = {
	qr: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM20 14v3M14 20h3M20 20h1",
	up: "M7 10v12M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.5l-2.3 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9Z",
	down: "M17 14V2M9 18.1 10 14H4.2a2 2 0 0 1-1.9-2.5l2.3-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.8a2 2 0 0 0-1.8 1.1L12 22a3.1 3.1 0 0 1-3-3.9Z",
	star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z",
	pin: "M12 17v5M9 10.8a2 2 0 0 1-1.1 1.8l-1.8.9A2 2 0 0 0 5 15.2V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.8a2 2 0 0 0-1.1-1.8l-1.8-.9A2 2 0 0 1 15 10.8V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1Z",
	chevron: "m6 9 6 6 6-6",
} as const;

function Icon({ name }: { name: keyof typeof PATHS }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d={PATHS[name]} />
		</svg>
	);
}

export default function ButtonGroupActions() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<ButtonGroup aria-label="Pay">
				<Button
					variant="secondary"
					roundness="full"
					size="icon"
					aria-label="Show QR code"
				>
					<Icon name="qr" />
				</Button>
				<ButtonGroupSeparator />
				<Button variant="secondary" roundness="full">
					Scan to pay
				</Button>
			</ButtonGroup>
			<ButtonGroup aria-label="Reactions">
				<Button variant="secondary" roundness="full">
					<Icon name="up" />
					2.4K
				</Button>
				<ButtonGroupSeparator />
				<Button variant="secondary" roundness="full" size="icon" aria-label="Dislike">
					<Icon name="down" />
				</Button>
			</ButtonGroup>
			<ButtonGroup aria-label="Star">
				<Button variant="secondary" roundness="full">
					<Icon name="star" />
					Star
				</Button>
				<ButtonGroupSeparator />
				<Button variant="secondary" roundness="full" className="px-2.5">
					<Badge size="sm">104</Badge>
				</Button>
			</ButtonGroup>
			<ButtonGroup aria-label="Pin">
				<Button variant="secondary" roundness="full">
					<Icon name="pin" />
					Pinned
				</Button>
				<ButtonGroupSeparator />
				<Button
					variant="secondary"
					roundness="full"
					size="icon"
					aria-label="More pin options"
				>
					<Icon name="chevron" />
				</Button>
			</ButtonGroup>
		</div>
	);
}
