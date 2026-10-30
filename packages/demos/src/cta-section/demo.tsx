"use client";

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
} from "@baby-ui/react";
import { type ComponentProps, type FormEvent, useState } from "react";
import { CTA_COPY, CTA_FACES, CTA_SETUP } from "../data/cta";
import { controlProps } from "../data/preview-props";

export function CtaSectionDemo({ props }: { props: Record<string, unknown> }) {
	const variant =
		controlProps<ComponentProps<typeof CtaSection>>(props).variant ?? "centered";
	const [open, setOpen] = useState(true);
	const [sent, setSent] = useState("");
	function subscribe(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSent(String(new FormData(event.currentTarget).get("email") ?? ""));
		event.currentTarget.reset();
	}
	const capture = props.capture === true;
	const signup = (label: string) => (
		<CtaSectionForm onSubmit={subscribe}>
			<Input
				name="email"
				type="email"
				required
				placeholder="you@company.com"
				aria-label="Work email"
			/>
			<Button type="submit" size="sm">
				{label}
			</Button>
		</CtaSectionForm>
	);
	if (variant === "banner") {
		const copy = CTA_COPY.banner;
		return (
			<div className="grid w-full gap-3">
				<CtaSection variant="banner" open={open} onOpenChange={setOpen}>
					<CtaSectionContent>
						<CtaSectionTitle>{copy.title}</CtaSectionTitle>
						<CtaSectionDescription>
							<span role="status">
								{sent ? `Invite sent to ${sent}` : copy.description}
							</span>
						</CtaSectionDescription>
					</CtaSectionContent>
					<CtaSectionActions>
						{capture ? (
							signup(copy.primaryAction.label)
						) : (
							<CtaSectionAction href={copy.primaryAction.href}>
								{copy.primaryAction.label}
							</CtaSectionAction>
						)}
						<CtaSectionDismiss />
					</CtaSectionActions>
				</CtaSection>
				{open ? null : (
					<Button
						variant="outline"
						size="sm"
						className="justify-self-center"
						onClick={() => setOpen(true)}
					>
						Show the banner again
					</Button>
				)}
			</div>
		);
	}
	if (variant === "split") {
		const copy = CTA_COPY.split;
		return (
			<CtaSection variant="split">
				<CtaSectionContent>
					<CtaSectionTitle>{copy.title}</CtaSectionTitle>
					<CtaSectionDescription>
						<span role="status">
							{sent ? `Invite sent to ${sent}` : copy.description}
						</span>
					</CtaSectionDescription>
					<CtaSectionPoints>
						{copy.points.map((point) => (
							<CtaSectionPoint key={point}>{point}</CtaSectionPoint>
						))}
					</CtaSectionPoints>
					{capture ? (
						signup(copy.primaryAction.label)
					) : (
						<CtaSectionActions>
							<CtaSectionAction href={copy.primaryAction.href}>
								{copy.primaryAction.label}
							</CtaSectionAction>
							<CtaSectionAction variant="outline" href={copy.secondaryAction.href}>
								{copy.secondaryAction.label}
							</CtaSectionAction>
						</CtaSectionActions>
					)}
				</CtaSectionContent>
				<CtaSectionVisual>
					<Card className="w-full max-w-80">
						<CardHeader>
							<CardTitle>{CTA_SETUP.workspace}</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-3 text-sm">
							<Progress value={66} label="Setting up" showValue />
							{CTA_SETUP.steps.map((step) => (
								<p key={step} className="text-muted-foreground">
									{step}
								</p>
							))}
						</CardContent>
					</Card>
				</CtaSectionVisual>
			</CtaSection>
		);
	}
	const copy = CTA_COPY.centered;
	return (
		<CtaSection variant="centered">
			<CtaSectionContent>
				<CtaSectionTitle>{copy.title}</CtaSectionTitle>
				<CtaSectionDescription>{copy.description}</CtaSectionDescription>
				{capture ? (
					signup(copy.primaryAction.label)
				) : (
					<CtaSectionActions>
						<CtaSectionAction href={copy.primaryAction.href}>
							{copy.primaryAction.label}
						</CtaSectionAction>
						<CtaSectionAction variant="outline" href={copy.secondaryAction.href}>
							{copy.secondaryAction.label}
						</CtaSectionAction>
					</CtaSectionActions>
				)}
				<CtaSectionNote role="status">
					<AvatarGroup aria-hidden="true">
						{CTA_FACES.map((face) => (
							<Avatar key={face.src} size="sm" className="size-6.5">
								<AvatarImage src={face.src} alt="" />
								<AvatarFallback />
							</Avatar>
						))}
					</AvatarGroup>
					{sent ? `Invite sent to ${sent}` : copy.note}
				</CtaSectionNote>
			</CtaSectionContent>
		</CtaSection>
	);
}
