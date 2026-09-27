import { Column, Link, Row, Section, Text } from "react-email";
import {
	EmailButton,
	EmailDivider,
	EmailFooter,
	type EmailFooterLink,
	EmailHeader,
	EmailHeading,
	EmailShell,
	type EmailShellSurface,
	EmailText,
} from "../email-kit/email-kit";
import { type EmailWelcomeDensity, emailWelcome } from "./variants";

export type { EmailWelcomeDensity };

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
	actionLabel?: string;
	/** Shown as a mailto link in the help line; omit to hide the line. */
	supportEmail?: string;
	/** Lead-in before the support address. */
	supportLabel?: string;
	footerLinks?: EmailFooterLink[];
	preview?: string;
	heading?: string;
	intro?: string;
	surface?: EmailShellSurface;
	density?: EmailWelcomeDensity;
}

export function EmailWelcome({
	productName,
	actionUrl,
	steps,
	companyLines,
	recipientName,
	logoUrl,
	actionLabel = "Get started",
	supportEmail,
	supportLabel = "Questions? Reply to this email or write to",
	footerLinks,
	preview = `Your ${productName} account is ready. Here is how to get started.`,
	heading = recipientName ? `Welcome, ${recipientName}` : `Welcome to ${productName}`,
	intro = `Your ${productName} account is ready. A few things worth doing first:`,
	surface = "card",
	density = "comfortable",
}: EmailWelcomeProps) {
	const s = emailWelcome({ density });
	return (
		<EmailShell
			preview={preview}
			surface={surface}
			footer={<EmailFooter lines={companyLines} links={footerLinks} />}
		>
			<EmailHeader brand={productName} logo={logoUrl} />
			<EmailHeading>{heading}</EmailHeading>
			<EmailText tone="muted" className={s.intro()}>
				{intro}
			</EmailText>
			{steps.length > 0 ? (
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
			) : null}
			<Section className={s.action()}>
				<EmailButton href={actionUrl}>{actionLabel}</EmailButton>
			</Section>
			{supportEmail ? (
				<>
					<EmailDivider spacing="lg" />
					<EmailText tone="muted" size="sm">
						{supportLabel}{" "}
						<Link href={`mailto:${supportEmail}`} className={s.helpLink()}>
							{supportEmail}
						</Link>
						.
					</EmailText>
				</>
			) : null}
		</EmailShell>
	);
}
