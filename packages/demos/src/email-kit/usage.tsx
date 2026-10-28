import {
	EmailButton,
	EmailFooter,
	EmailHeader,
	EmailHeading,
	EmailKeyValue,
	EmailShell,
	EmailText,
} from "@baby-ui/react";

export function Example() {
	return (
		<EmailShell
			preview="Your receipt from Acme"
			footer={<EmailFooter lines={["Acme, Inc.", "1 Main St, Springfield"]} />}
		>
			<EmailHeader brand="Acme" />
			<EmailHeading>Payment received</EmailHeading>
			<EmailText tone="muted">Thanks for your order.</EmailText>
			<EmailKeyValue
				rows={[{ label: "Plan", value: "Pro, monthly" }]}
				total={{ label: "Total", value: "$24.00" }}
			/>
			<EmailButton href="https://acme.com/billing">View invoice</EmailButton>
		</EmailShell>
	);
}
