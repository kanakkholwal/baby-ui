import { Signature } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function SignatureDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Signature>>(props);
	return (
		<Signature
			key={JSON.stringify(props)}
			text={p.text || "Baby UI"}
			variant={p.variant ?? "ink"}
			duration={Number(props.duration ?? 2)}
			delay={Number(props.delay ?? 0)}
			strokeWidth={Number(props.strokeWidth ?? 1)}
			inView={p.inView ?? false}
			className="font-['Segoe_Script','Snell_Roundhand','Apple_Chancery',cursive] text-6xl text-foreground"
		/>
	);
}
