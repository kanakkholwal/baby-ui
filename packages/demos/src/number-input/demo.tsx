import { NumberInput } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function NumberInputDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof NumberInput>>(props);
	const size = p.size ?? "default";
	const [seats, setSeats] = useState<number | null>(5);
	const [budget, setBudget] = useState<number | null>(1200);
	return (
		<div className="flex w-full max-w-60 flex-col gap-5">
			<NumberInput
				label="Seats"
				value={seats}
				onValueChange={setSeats}
				min={1}
				max={50}
				variant={p.variant ?? "default"}
				size={size}
				suffix={p.suffix || undefined}
				disabled={p.disabled ?? false}
				limitHint={p.limitHint ?? true}
			/>
			<NumberInput
				label="Monthly budget"
				value={budget}
				onValueChange={setBudget}
				min={0}
				step={50}
				largeStep={500}
				formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
				variant={p.variant ?? "default"}
				size={size}
				disabled={p.disabled ?? false}
			/>
		</div>
	);
}
