import { Button } from "@baby-ui/components/react/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@baby-ui/components/react/button-group";

const PATHS = {
	photo:
		"M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2ZM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM21 15l-5-5L5 21",
	video:
		"m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11ZM4 6h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
	more: "M12 12h.01M19 12h.01M5 12h.01",
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

export default function ButtonGroupSelection() {
	return (
		<div className="flex flex-col items-start gap-4">
			<ButtonGroup aria-label="Content type">
				<Button variant="secondary" roundness="full">
					<Icon name="photo" />
					Photos
				</Button>
				<ButtonGroupSeparator />
				<Button variant="secondary" roundness="full">
					<Icon name="video" />
					Videos
				</Button>
				<ButtonGroupSeparator />
				<Button
					variant="secondary"
					roundness="full"
					size="icon"
					aria-label="More options"
				>
					<Icon name="more" />
				</Button>
			</ButtonGroup>
			<ButtonGroup aria-label="Text alignment">
				<Button variant="secondary" roundness="full">
					Left
				</Button>
				<ButtonGroupSeparator />
				<Button variant="secondary" roundness="full">
					Center
				</Button>
				<ButtonGroupSeparator />
				<Button variant="secondary" roundness="full">
					Right
				</Button>
			</ButtonGroup>
		</div>
	);
}
