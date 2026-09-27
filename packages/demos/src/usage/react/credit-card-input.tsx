import { Button, type CardValue, CreditCardInput } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [card, setCard] = useState<CardValue>({ number: "", expiry: "", cvc: "" });
	const [ready, setReady] = useState(false);
	return (
		<form className="flex flex-col gap-4">
			<CreditCardInput
				value={card}
				onValueChange={(next, validity) => {
					setCard(next);
					setReady(validity.valid);
				}}
			/>
			<Button type="submit" disabled={!ready}>
				Pay
			</Button>
		</form>
	);
}
