<script lang="ts">
import {
	Avatar,
	AvatarFallback,
	AvatarGroup,
	AvatarImage,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CtaSection,
	CtaSectionAction,
	CtaSectionActions,
	CtaSectionContent,
	CtaSectionDescription,
	CtaSectionDismiss,
	CtaSectionForm,
	CtaSectionNote,
	CtaSectionPoint,
	CtaSectionPoints,
	CtaSectionTitle,
	CtaSectionVisual,
	Input,
	Progress,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { CTA_COPY, CTA_FACES, CTA_SETUP } from "../data/cta";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const variant = $derived(
	controlProps<ComponentProps<typeof CtaSection>>(props).variant ?? "centered",
);
let open = $state(true);
let sent = $state("");
function subscribe(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
	event.preventDefault();
	sent = String(new FormData(event.currentTarget).get("email") ?? "");
	event.currentTarget.reset();
}
const capture = $derived(props.capture === true);
</script>

{#snippet signup(label: string)}
	<CtaSectionForm onsubmit={subscribe}>
		<Input name="email" type="email" required placeholder="you@company.com" aria-label="Work email" />
		<Button type="submit" size="sm">{label}</Button>
	</CtaSectionForm>
{/snippet}

{#if variant === "banner"}
	<div class="grid w-full gap-3">
		<CtaSection variant="banner" bind:open>
			<CtaSectionContent>
				<CtaSectionTitle>{CTA_COPY.banner.title}</CtaSectionTitle>
				<CtaSectionDescription role="status">
					{sent ? `Invite sent to ${sent}` : CTA_COPY.banner.description}
				</CtaSectionDescription>
			</CtaSectionContent>
			<CtaSectionActions>
				{#if capture}
					{@render signup(CTA_COPY.banner.primaryAction.label)}
				{:else}
					<CtaSectionAction href={CTA_COPY.banner.primaryAction.href}>
						{CTA_COPY.banner.primaryAction.label}
					</CtaSectionAction>
				{/if}
				<CtaSectionDismiss />
			</CtaSectionActions>
		</CtaSection>
		{#if !open}
			<Button variant="outline" size="sm" class="justify-self-center" onclick={() => (open = true)}>
				Show the banner again
			</Button>
		{/if}
	</div>
{:else if variant === "split"}
	<CtaSection variant="split">
		<CtaSectionContent>
			<CtaSectionTitle>{CTA_COPY.split.title}</CtaSectionTitle>
			<CtaSectionDescription role="status">
				{sent ? `Invite sent to ${sent}` : CTA_COPY.split.description}
			</CtaSectionDescription>
			<CtaSectionPoints>
				{#each CTA_COPY.split.points as point (point)}
					<CtaSectionPoint>{point}</CtaSectionPoint>
				{/each}
			</CtaSectionPoints>
			{#if capture}
				{@render signup(CTA_COPY.split.primaryAction.label)}
			{:else}
				<CtaSectionActions>
					<CtaSectionAction href={CTA_COPY.split.primaryAction.href}>
						{CTA_COPY.split.primaryAction.label}
					</CtaSectionAction>
					<CtaSectionAction variant="outline" href={CTA_COPY.split.secondaryAction.href}>
						{CTA_COPY.split.secondaryAction.label}
					</CtaSectionAction>
				</CtaSectionActions>
			{/if}
		</CtaSectionContent>
		<CtaSectionVisual>
			<Card class="w-full max-w-80">
				<CardHeader>
					<CardTitle>{CTA_SETUP.workspace}</CardTitle>
				</CardHeader>
				<CardContent class="grid gap-3 text-sm">
					<Progress value={66} label="Setting up" showValue />
					{#each CTA_SETUP.steps as step (step)}
						<p class="text-muted-foreground">{step}</p>
					{/each}
				</CardContent>
			</Card>
		</CtaSectionVisual>
	</CtaSection>
{:else}
	<CtaSection variant="centered">
		<CtaSectionContent>
			<CtaSectionTitle>{CTA_COPY.centered.title}</CtaSectionTitle>
			<CtaSectionDescription>{CTA_COPY.centered.description}</CtaSectionDescription>
			{#if capture}
				{@render signup(CTA_COPY.centered.primaryAction.label)}
			{:else}
				<CtaSectionActions>
					<CtaSectionAction href={CTA_COPY.centered.primaryAction.href}>
						{CTA_COPY.centered.primaryAction.label}
					</CtaSectionAction>
					<CtaSectionAction variant="outline" href={CTA_COPY.centered.secondaryAction.href}>
						{CTA_COPY.centered.secondaryAction.label}
					</CtaSectionAction>
				</CtaSectionActions>
			{/if}
			<CtaSectionNote role="status">
				<AvatarGroup aria-hidden="true">
					{#each CTA_FACES as face (face.src)}
						<Avatar size="sm" class="size-6.5">
							<AvatarImage src={face.src} alt="" />
							<AvatarFallback />
						</Avatar>
					{/each}
				</AvatarGroup>
				{sent ? `Invite sent to ${sent}` : CTA_COPY.centered.note}
			</CtaSectionNote>
		</CtaSectionContent>
	</CtaSection>
{/if}
