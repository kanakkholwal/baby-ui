import { Button } from "@baby-ui/components/react/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@baby-ui/components/react/button-group";

const SIZES = ["xs", "sm", "default", "lg", "xl"] as const;

export default function ButtonGroupSizes() {
	return (
		<div className="flex flex-col items-start gap-3">
			{SIZES.map((size) => (
				<ButtonGroup key={size} aria-label={`${size} group`}>
					<Button variant="secondary" size={size} roundness="soft">
						First
					</Button>
					<ButtonGroupSeparator />
					<Button variant="secondary" size={size} roundness="soft">
						Second
					</Button>
					<ButtonGroupSeparator />
					<Button variant="secondary" size={size} roundness="soft">
						Third
					</Button>
				</ButtonGroup>
			))}
		</div>
	);
}
