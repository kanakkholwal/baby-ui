import { EmailWelcome } from "@baby-ui/react";

export function Example() {
	return (
		<EmailWelcome
			productName="Acme"
			recipientName="Ada"
			actionUrl="https://acme.com/dashboard"
			steps={[
				{ title: "Connect your data", description: "Link Postgres or upload a CSV." },
				{
					title: "Invite your team",
					description: "Teammates join with the role you pick.",
				},
			]}
			supportEmail="help@acme.com"
			companyLines={["Acme, Inc.", "1 Main St, Springfield"]}
		/>
	);
}
