import { Signature, type SignatureVariant } from "@baby-ui/react";

type Props = Record<string, unknown>;

export function SignatureDemo({ props }: { props: Props }) {
	return (
		<Signature
			key={JSON.stringify(props)}
			text={(props.text as string) || "Baby UI"}
			variant={(props.variant as SignatureVariant) ?? "ink"}
			duration={Number(props.duration ?? 2)}
			delay={Number(props.delay ?? 0)}
			strokeWidth={Number(props.strokeWidth ?? 1)}
			inView={Boolean(props.inView)}
			className="font-['Segoe_Script','Snell_Roundhand','Apple_Chancery',cursive] text-6xl text-foreground"
		/>
	);
}
