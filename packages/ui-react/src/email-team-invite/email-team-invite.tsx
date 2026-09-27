import { Column, Img, Row, Section, Text } from "react-email";
import {
	EmailBadge,
	EmailButton,
	EmailCallout,
	EmailDivider,
	EmailFallbackLink,
	EmailFooter,
	type EmailFooterLink,
	EmailHeader,
	EmailHeading,
	EmailPanel,
	EmailShell,
	type EmailShellAccent,
	type EmailShellSurface,
	EmailText,
} from "../email-kit/email-kit";
import { emailLayout } from "../email-kit/variants";
import { type EmailTeamInviteDesign, emailTeamInvite, initials } from "./variants";

export type { EmailTeamInviteDesign };

export interface EmailTeamInviteProps {
	productName: string;
	inviterName: string;
	teamName: string;
	/** One-time link that joins the team. */
	acceptUrl: string;
	/** Sender name and postal address, one line each. */
	companyLines: string[];
	inviterEmail?: string;
	/** Absolute URL of the inviter's photo; initials show without it. */
	inviterAvatarUrl?: string;
	/** Role the invitee joins with, e.g. "Editor". */
	role?: string;
	/** A personal note from the inviter, shown quoted. */
	message?: string;
	/** Pre-formatted lifetime, e.g. "7 days". */
	expiresIn?: string;
	/** Absolute URL, about 32px tall. Falls back to the product name as text. */
	logoUrl?: string;
	footerLinks?: EmailFooterLink[];
	reason?: string;
	preview?: string;
	/** Defaults to `Join {teamName} on {productName}`, or the team name in `spotlight`. */
	heading?: string;
	intro?: string;
	/** Line above the team name in `spotlight`. */
	lead?: string;
	actionLabel?: string;
	closingText?: string;
	fallbackLabel?: string;
	/** `classic` is a left-aligned card; `spotlight` centres a large avatar and the team name. */
	design?: EmailTeamInviteDesign;
	surface?: EmailShellSurface;
	accent?: EmailShellAccent;
}

/** An invitation to join a team, with who sent it, the role, and their note. */
export function EmailTeamInvite({
	productName,
	inviterName,
	teamName,
	acceptUrl,
	companyLines,
	inviterEmail,
	inviterAvatarUrl,
	role,
	message,
	expiresIn,
	logoUrl,
	footerLinks,
	reason,
	preview = `${inviterName} invited you to join ${teamName} on ${productName}.`,
	heading,
	intro = `${inviterName} invited you to collaborate${role ? ` as ${role}` : ""}.`,
	lead = `${inviterName} invited you to join`,
	actionLabel = "Accept invitation",
	closingText = `${expiresIn ? `This invitation expires in ${expiresIn}. ` : ""}If you weren't expecting it, you can ignore this email.`,
	fallbackLabel,
	design = "classic",
	surface = "card",
	accent = "none",
}: EmailTeamInviteProps) {
	const s = emailLayout();
	const t = emailTeamInvite({ design });
	const avatar = inviterAvatarUrl ? (
		<Img
			src={inviterAvatarUrl}
			alt={inviterName}
			width={design === "spotlight" ? 64 : 40}
			height={design === "spotlight" ? 64 : 40}
			className={t.avatar()}
		/>
	) : (
		<Text className={t.initials()}>{initials(inviterName)}</Text>
	);

	if (design === "spotlight") {
		return (
			<EmailShell
				preview={preview}
				surface={surface}
				accent={accent}
				cardFooter={
					<EmailFooter
						lines={companyLines}
						links={footerLinks}
						reason={reason}
						layout="band"
					/>
				}
			>
				<EmailHeader brand={productName} logo={logoUrl} align="center" />
				{avatar}
				<Text className={t.lead()}>{lead}</Text>
				<EmailHeading size="display" align="center">
					{heading ?? teamName}
				</EmailHeading>
				{role ? (
					<Section className={t.role()}>
						<EmailBadge tone="accent">{role}</EmailBadge>
					</Section>
				) : null}
				{message ? (
					<Section className={s.section()}>
						<EmailPanel>
							<EmailText>“{message}”</EmailText>
							<Text className={t.signoff()}>
								{inviterName}
								{inviterEmail ? `, ${inviterEmail}` : ""}
							</Text>
						</EmailPanel>
					</Section>
				) : null}
				<Section className={s.action()}>
					<EmailButton href={acceptUrl} size="lg" shape="pill" width="full">
						{actionLabel}
					</EmailButton>
				</Section>
				<EmailText tone="muted" size="sm" className={t.closing()}>
					{closingText}
				</EmailText>
				<EmailDivider spacing="lg" />
				<EmailFallbackLink href={acceptUrl} label={fallbackLabel} align="center" />
			</EmailShell>
		);
	}

	return (
		<EmailShell
			preview={preview}
			surface={surface}
			accent={accent}
			footer={<EmailFooter lines={companyLines} links={footerLinks} reason={reason} />}
		>
			<EmailHeader brand={productName} logo={logoUrl} />
			<EmailHeading>{heading ?? `Join ${teamName} on ${productName}`}</EmailHeading>
			<EmailText tone="muted" className={s.intro()}>
				{intro}
			</EmailText>
			<Section className={s.section()}>
				<Row>
					<Column className={t.avatarCell()}>{avatar}</Column>
					<Column>
						<Text className={t.name()}>{inviterName}</Text>
						{inviterEmail ? <Text className={t.email()}>{inviterEmail}</Text> : null}
					</Column>
				</Row>
			</Section>
			{message ? (
				<Section className={s.section()}>
					<EmailCallout>
						<EmailText size="sm">“{message}”</EmailText>
					</EmailCallout>
				</Section>
			) : null}
			<Section className={s.action()}>
				<EmailButton href={acceptUrl}>{actionLabel}</EmailButton>
			</Section>
			<EmailText tone="muted" size="sm" className={t.closing()}>
				{closingText}
			</EmailText>
			<EmailDivider spacing="lg" />
			<EmailFallbackLink href={acceptUrl} label={fallbackLabel} />
		</EmailShell>
	);
}
