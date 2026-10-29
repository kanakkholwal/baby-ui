"use client";

import {
	Button,
	ContactSection,
	ContactSectionChannel,
	ContactSectionChannelDetail,
	ContactSectionChannelLink,
	ContactSectionChannels,
	ContactSectionChannelTitle,
	ContactSectionDescription,
	ContactSectionForm,
	ContactSectionFormDescription,
	ContactSectionFormTitle,
	ContactSectionHeader,
	ContactSectionTitle,
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	Input,
	NativeSelect,
	NativeSelectOption,
	Textarea,
} from "@baby-ui/react";
import { type ComponentProps, type FormEvent, useState } from "react";
import { CONTACT_SECTION as copy } from "../data/contact-section";
import { controlProps } from "../data/preview-props";

export function ContactSectionDemo({ props }: { props: Record<string, unknown> }) {
	const variant =
		controlProps<ComponentProps<typeof ContactSection>>(props).variant ?? "split";
	const [sentTo, setSentTo] = useState("");

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSentTo(String(new FormData(event.currentTarget).get("name") ?? ""));
		event.currentTarget.reset();
	}

	return (
		<ContactSection variant={variant}>
			<ContactSectionHeader>
				<ContactSectionTitle>{copy.title}</ContactSectionTitle>
				<ContactSectionDescription>{copy.description}</ContactSectionDescription>
			</ContactSectionHeader>
			<ContactSectionChannels>
				{copy.channels.map((channel) => (
					<ContactSectionChannel key={channel.title}>
						<ContactSectionChannelTitle>{channel.title}</ContactSectionChannelTitle>
						<ContactSectionChannelLink href={channel.link.href}>
							{channel.link.label}
						</ContactSectionChannelLink>
						<ContactSectionChannelDetail>{channel.detail}</ContactSectionChannelDetail>
					</ContactSectionChannel>
				))}
			</ContactSectionChannels>
			<ContactSectionForm onSubmit={submit}>
				<ContactSectionFormTitle>{copy.form.title}</ContactSectionFormTitle>
				<ContactSectionFormDescription>
					{copy.form.description}
				</ContactSectionFormDescription>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="contact-name">Full name</FieldLabel>
						<Input id="contact-name" name="name" autoComplete="name" required />
					</Field>
					<Field>
						<FieldLabel htmlFor="contact-email">Work email</FieldLabel>
						<Input
							id="contact-email"
							name="email"
							type="email"
							autoComplete="email"
							required
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="contact-topic">Topic</FieldLabel>
						<NativeSelect id="contact-topic" name="topic">
							{copy.form.topics.map((topic) => (
								<NativeSelectOption key={topic} value={topic}>
									{topic}
								</NativeSelectOption>
							))}
						</NativeSelect>
					</Field>
					<Field>
						<FieldLabel htmlFor="contact-message">Message</FieldLabel>
						<Textarea id="contact-message" name="message" rows={4} required />
					</Field>
				</FieldGroup>
				<Button type="submit">{copy.form.submit}</Button>
				<FieldDescription role="status">
					{sentTo ? copy.form.sent(sentTo) : null}
				</FieldDescription>
			</ContactSectionForm>
		</ContactSection>
	);
}
