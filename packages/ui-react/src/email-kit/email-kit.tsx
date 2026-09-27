import type { ReactNode } from "react";
import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	pixelBasedPreset,
	Row,
	Section,
	Tailwind,
	Text,
} from "react-email";
import { cn } from "../lib/cn";
import { emailTailwindConfig } from "../lib/email-theme";
import {
	type EmailButtonSize,
	type EmailButtonVariant,
	type EmailCalloutTone,
	type EmailCodeSize,
	type EmailDividerSpacing,
	type EmailFooterAlign,
	type EmailHeaderAlign,
	type EmailHeadingSize,
	type EmailKeyValueDensity,
	type EmailShellSurface,
	type EmailShellWidth,
	type EmailTextSize,
	type EmailTextTone,
	emailButton,
	emailCallout,
	emailCode,
	emailDivider,
	emailFooter,
	emailHeader,
	emailHeading,
	emailKeyValue,
	emailShell,
	emailText,
} from "./variants";

export type {
	EmailButtonSize,
	EmailButtonVariant,
	EmailCalloutTone,
	EmailCodeSize,
	EmailDividerSpacing,
	EmailFooterAlign,
	EmailHeaderAlign,
	EmailHeadingSize,
	EmailKeyValueDensity,
	EmailShellSurface,
	EmailShellWidth,
	EmailTextSize,
	EmailTextTone,
};

const tailwindConfig = { ...emailTailwindConfig, presets: [pixelBasedPreset] };

export interface EmailShellProps {
	/** Inbox preview line shown after the subject; keep it under ~90 characters. */
	preview: string;
	children: ReactNode;
	lang?: string;
	width?: EmailShellWidth;
	surface?: EmailShellSurface;
	/** Rendered outside the card, e.g. an EmailFooter. */
	footer?: ReactNode;
}

/** Document, theme and layout for every template: a centred card on a quiet page. */
export function EmailShell({
	preview,
	children,
	lang = "en",
	width = "md",
	surface = "card",
	footer,
}: EmailShellProps) {
	const s = emailShell({ width, surface });
	return (
		<Html lang={lang}>
			<Tailwind config={tailwindConfig}>
				<Head>
					<meta name="color-scheme" content="light dark" />
					<meta name="supported-color-schemes" content="light dark" />
				</Head>
				<Preview>{preview}</Preview>
				<Body className={s.body()}>
					<Section className={s.page()}>
						<Container className={s.container()}>
							<Section className={s.card()}>{children}</Section>
							{footer}
						</Container>
					</Section>
				</Body>
			</Tailwind>
		</Html>
	);
}

export interface EmailHeaderProps {
	brand: string;
	/** Absolute URL: inboxes cannot resolve relative paths. */
	logo?: string;
	logoWidth?: number;
	align?: EmailHeaderAlign;
}

export function EmailHeader({
	brand,
	logo,
	logoWidth = 32,
	align = "left",
}: EmailHeaderProps) {
	const s = emailHeader({ align });
	return (
		<Section className={s.root()}>
			{logo ? (
				<Img src={logo} alt={brand} width={logoWidth} height={32} className={s.logo()} />
			) : (
				<Text className={s.brand()}>{brand}</Text>
			)}
		</Section>
	);
}

export function EmailHeading({
	children,
	size = "lg",
}: {
	children: ReactNode;
	size?: EmailHeadingSize;
}) {
	return (
		<Heading as="h1" className={emailHeading({ size })}>
			{children}
		</Heading>
	);
}

export function EmailText({
	children,
	tone = "default",
	size = "md",
	className,
}: {
	children: ReactNode;
	tone?: EmailTextTone;
	size?: EmailTextSize;
	className?: string;
}) {
	return <Text className={cn(emailText({ tone, size }), className)}>{children}</Text>;
}

export function EmailButton({
	href,
	children,
	variant = "primary",
	size = "md",
}: {
	href: string;
	children: ReactNode;
	variant?: EmailButtonVariant;
	size?: EmailButtonSize;
}) {
	return (
		<Button href={href} className={emailButton({ variant, size })}>
			{children}
		</Button>
	);
}

export function EmailCallout({
	children,
	tone = "neutral",
}: {
	children: ReactNode;
	tone?: EmailCalloutTone;
}) {
	return <Section className={emailCallout({ tone })}>{children}</Section>;
}

export function EmailDivider({ spacing = "md" }: { spacing?: EmailDividerSpacing }) {
	return <Hr className={emailDivider({ spacing })} />;
}

export interface EmailFooterLink {
	label: string;
	href: string;
}

export interface EmailFooterProps {
	/** Sender identity and postal address: required for commercial mail in many regions. */
	lines: string[];
	links?: EmailFooterLink[];
	align?: EmailFooterAlign;
}

export function EmailFooter({ lines, links = [], align = "center" }: EmailFooterProps) {
	const s = emailFooter({ align });
	return (
		<Section className={s.root()}>
			{lines.map((line) => (
				<Text key={line} className={s.text()}>
					{line}
				</Text>
			))}
			{links.length > 0 ? (
				<Text className={s.text()}>
					{links.map((link, i) => (
						<span key={link.href}>
							{i > 0 ? " · " : null}
							<Link href={link.href} className={s.link()}>
								{link.label}
							</Link>
						</span>
					))}
				</Text>
			) : null}
		</Section>
	);
}

export function EmailCode({ code, size = "lg" }: { code: string; size?: EmailCodeSize }) {
	return <Text className={emailCode({ size })}>{code}</Text>;
}

export interface EmailKeyValueRow {
	label: string;
	value: string;
}

export function EmailKeyValue({
	rows,
	total,
	density = "comfortable",
}: {
	rows: EmailKeyValueRow[];
	/** Emphasised last row with a rule above it, e.g. an order total. */
	total?: EmailKeyValueRow;
	density?: EmailKeyValueDensity;
}) {
	const s = emailKeyValue({ density });
	return (
		<Section>
			{rows.map((row) => (
				<Row key={row.label}>
					<Column className={s.label()}>{row.label}</Column>
					<Column className={s.value()}>{row.value}</Column>
				</Row>
			))}
			{total ? (
				<Row>
					<Column className={cn(s.label(), s.total())}>{total.label}</Column>
					<Column className={cn(s.value(), s.total())}>{total.value}</Column>
				</Row>
			) : null}
		</Section>
	);
}
