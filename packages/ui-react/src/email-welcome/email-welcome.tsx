import { Column, Img, Link, Row, Section, Text } from "react-email";
import {
	EmailButton,
	EmailDivider,
	EmailFooter,
	type EmailFooterLink,
	EmailHeader,
	EmailHeading,
	EmailSection,
	EmailShell,
	type EmailShellAccent,
	type EmailShellSurface,
	EmailText,
} from "../email-kit/email-kit";
import {
	type EmailWelcomeDensity,
	type EmailWelcomeDesign,
	emailWelcome,
} from "./variants";

export type { EmailWelcomeDensity, EmailWelcomeDesign };

export interface EmailWelcomeStep {
	title: string;
	description: string;
}

export interface EmailWelcomeProps {
	productName: string;
	/** Where the button lands: usually the dashboard or the first setup screen. */
	actionUrl: string;
	/** Two to four first actions; an empty list hides the section. */
	steps: EmailWelcomeStep[];
	/** Sender name and postal address, one line each. */
	companyLines: string[];
	recipientName?: string;
	/** Absolute URL, about 32px tall. Falls back to the product name as text. */
	logoUrl?: string;
	/** Absolute URL of a wide illustration or product shot for the `stacked` design. */
	heroImageUrl?: string;
	heroImageAlt?: string;
	actionLabel?: string;
	/** Shown as a mailto link in the help line; omit to hide the line. */
	supportEmail?: string;
	/** Lead-in before the support address. */
	supportLabel?: string;
	footerLinks?: EmailFooterLink[];
	preview?: string;
	/** Small line above the heading in the `stacked` design. */
	eyebrow?: string;
	heading?: string;
	intro?: string;
	stepsTitle?: string;
	/** Footer line saying why this arrived, e.g. "You're receiving this because you signed up". */
	reason?: string;
	/** `classic` is one card; `stacked` splits the email into cards with a centred, image-led opener. */
	design?: EmailWelcomeDesign;
	surface?: EmailShellSurface;
	accent?: EmailShellAccent;
	density?: EmailWelcomeDensity;
}

export function EmailWelcome({
	productName,
	actionUrl,
	steps,
	companyLines,
	recipientName,
	logoUrl,
	heroImageUrl,
	heroImageAlt,
	actionLabel = "Get started",
	supportEmail,
	supportLabel = "Questions? Reply to this email or write to",
	footerLinks,
	preview = `Your ${productName} account is ready. Here is how to get started.`,
	eyebrow = "Thanks for joining",
	heading = recipientName ? `Welcome, ${recipientName}` : `Welcome to ${productName}`,
	intro = `Your ${productName} account is ready. A few things worth doing first:`,
	stepsTitle = "Getting started",
	reason,
	design = "classic",
	surface = "card",
	accent = "none",
	density = "comfortable",
}: EmailWelcomeProps) {
	const s = emailWelcome({ design, density });
	const stacked = design === "stacked";
	const stepList =
		steps.length > 0 ? (
			<Section className={s.steps()}>
				{steps.map((step, i) => (
					<Row key={step.title}>
						<Column className={s.stepIndex()}>
							<Text className={s.stepBadge()}>{i + 1}</Text>
						</Column>
						<Column>
							<Text className={s.stepTitle()}>{step.title}</Text>
							<Text className={s.stepBody()}>{step.description}</Text>
						</Column>
					</Row>
				))}
			</Section>
		) : null;
	const help = supportEmail ? (
		<EmailText tone="muted" size="sm">
			{supportLabel}{" "}
			<Link href={`mailto:${supportEmail}`} className={s.helpLink()}>
				{supportEmail}
			</Link>
			.
		</EmailText>
	) : null;
	const footer = <EmailFooter lines={companyLines} links={footerLinks} reason={reason} />;

	if (stacked)
		return (
			<EmailShell preview={preview} surface="stacked" accent={accent} footer={footer}>
				<EmailSection align="center">
					<EmailHeader brand={productName} logo={logoUrl} align="center" />
					{heroImageUrl ? (
						<Img
							src={heroImageUrl}
							alt={heroImageAlt ?? productName}
							width={432}
							className={s.heroImage()}
						/>
					) : null}
					<EmailText className={s.eyebrow()}>{eyebrow}</EmailText>
					<EmailHeading size="display" align="center">
						{heading}
					</EmailHeading>
					<EmailText tone="muted" className={s.intro()}>
						{intro}
					</EmailText>
					<Section className={s.action()}>
						<EmailButton href={actionUrl} size="lg" shape="pill">
							{actionLabel}
						</EmailButton>
					</Section>
				</EmailSection>
				{stepList ? (
					<EmailSection>
						<EmailHeading size="md">{stepsTitle}</EmailHeading>
						{stepList}
					</EmailSection>
				) : null}
				{help ? <EmailSection>{help}</EmailSection> : null}
			</EmailShell>
		);

	return (
		<EmailShell preview={preview} surface={surface} accent={accent} footer={footer}>
			<EmailHeader brand={productName} logo={logoUrl} />
			<EmailHeading>{heading}</EmailHeading>
			<EmailText tone="muted" className={s.intro()}>
				{intro}
			</EmailText>
			{stepList}
			<Section className={s.action()}>
				<EmailButton href={actionUrl}>{actionLabel}</EmailButton>
			</Section>
			{help ? (
				<>
					<EmailDivider spacing="lg" />
					{help}
				</>
			) : null}
		</EmailShell>
	);
}
