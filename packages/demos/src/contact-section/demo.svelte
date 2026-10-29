<script lang="ts">
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
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { CONTACT_SECTION as copy } from "../data/contact-section";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const variant = $derived(
	controlProps<ComponentProps<typeof ContactSection>>(props).variant ?? "split",
);
let sentTo = $state("");

function submit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
	event.preventDefault();
	sentTo = String(new FormData(event.currentTarget).get("name") ?? "");
	event.currentTarget.reset();
}
</script>

<ContactSection {variant}>
	<ContactSectionHeader>
		<ContactSectionTitle>{copy.title}</ContactSectionTitle>
		<ContactSectionDescription>{copy.description}</ContactSectionDescription>
	</ContactSectionHeader>
	<ContactSectionChannels>
		{#each copy.channels as channel (channel.title)}
			<ContactSectionChannel>
				<ContactSectionChannelTitle>{channel.title}</ContactSectionChannelTitle>
				<ContactSectionChannelLink href={channel.link.href}>{channel.link.label}</ContactSectionChannelLink>
				<ContactSectionChannelDetail>{channel.detail}</ContactSectionChannelDetail>
			</ContactSectionChannel>
		{/each}
	</ContactSectionChannels>
	<ContactSectionForm onsubmit={submit}>
		<ContactSectionFormTitle>{copy.form.title}</ContactSectionFormTitle>
		<ContactSectionFormDescription>{copy.form.description}</ContactSectionFormDescription>
		<FieldGroup>
			<Field>
				<FieldLabel for="contact-name">Full name</FieldLabel>
				<Input id="contact-name" name="name" autocomplete="name" required />
			</Field>
			<Field>
				<FieldLabel for="contact-email">Work email</FieldLabel>
				<Input id="contact-email" name="email" type="email" autocomplete="email" required />
			</Field>
			<Field>
				<FieldLabel for="contact-topic">Topic</FieldLabel>
				<NativeSelect id="contact-topic" name="topic">
					{#each copy.form.topics as topic (topic)}
						<NativeSelectOption value={topic}>{topic}</NativeSelectOption>
					{/each}
				</NativeSelect>
			</Field>
			<Field>
				<FieldLabel for="contact-message">Message</FieldLabel>
				<Textarea id="contact-message" name="message" rows={4} required />
			</Field>
		</FieldGroup>
		<Button type="submit">{copy.form.submit}</Button>
		<FieldDescription role="status">{sentTo ? copy.form.sent(sentTo) : ""}</FieldDescription>
	</ContactSectionForm>
</ContactSection>
