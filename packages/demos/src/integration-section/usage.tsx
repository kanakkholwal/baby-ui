import {
	IntegrationSection,
	IntegrationSectionHeader,
	IntegrationSectionItem,
	IntegrationSectionItemDescription,
	IntegrationSectionItemLink,
	IntegrationSectionItemLogo,
	IntegrationSectionItemName,
	IntegrationSectionList,
	IntegrationSectionTitle,
} from "@baby-ui/react";

export function Example() {
	return (
		<IntegrationSection variant="grid">
			<IntegrationSectionHeader>
				<IntegrationSectionTitle>
					Works with the tools you already use
				</IntegrationSectionTitle>
			</IntegrationSectionHeader>
			<IntegrationSectionList>
				<IntegrationSectionItem>
					<IntegrationSectionItemLogo>
						<img src="https://cdn.simpleicons.org/stripe" alt="" width={32} height={32} />
					</IntegrationSectionItemLogo>
					<IntegrationSectionItemName>Stripe</IntegrationSectionItemName>
					<IntegrationSectionItemDescription>
						Sync customers and invoices into each account.
					</IntegrationSectionItemDescription>
					<IntegrationSectionItemLink
						href="/integrations/stripe"
						aria-label="Learn more about Stripe"
					>
						Learn more
					</IntegrationSectionItemLink>
				</IntegrationSectionItem>
			</IntegrationSectionList>
		</IntegrationSection>
	);
}
