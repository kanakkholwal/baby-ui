import { Swappable, SwappableItem, SwappableSlot } from "@baby-ui/react";

const CARDS = ["Revenue", "Signups", "Churn"];

export function Example() {
	return (
		<Swappable className="grid grid-cols-3 gap-3" onSwap={(event) => console.log(event)}>
			{CARDS.map((card) => (
				<SwappableSlot key={card} id={card}>
					<SwappableItem id={card} className="p-4">
						{card}
					</SwappableItem>
				</SwappableSlot>
			))}
		</Swappable>
	);
}
