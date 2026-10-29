import {
	Button,
	ContactSection,
	ContactSectionChannel,
	ContactSectionChannelLink,
	ContactSectionChannels,
	ContactSectionChannelTitle,
	ContactSectionForm,
	ContactSectionFormTitle,
	ContactSectionHeader,
	ContactSectionTitle,
	Field,
	FieldLabel,
	Input,
} from "@baby-ui/react";

export function Example() {
	return (
		<ContactSection variant="split">
			<ContactSectionHeader>
				<ContactSectionTitle>Talk to a person, not a queue</ContactSectionTitle>
			</ContactSectionHeader>
			<ContactSectionChannels>
				<ContactSectionChannel>
					<ContactSectionChannelTitle>Sales</ContactSectionChannelTitle>
					<ContactSectionChannelLink href="mailto:sales@acme.dev">
						sales@acme.dev
					</ContactSectionChannelLink>
				</ContactSectionChannel>
			</ContactSectionChannels>
			<ContactSectionForm onSubmit={(event) => event.preventDefault()}>
				<ContactSectionFormTitle>Send us a note</ContactSectionFormTitle>
				<Field>
					<FieldLabel htmlFor="email">Work email</FieldLabel>
					<Input id="email" name="email" type="email" required />
				</Field>
				<Button type="submit">Send message</Button>
			</ContactSectionForm>
		</ContactSection>
	);
}
