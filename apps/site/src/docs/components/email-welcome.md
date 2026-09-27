---
title: Welcome Email
description: Sent right after sign-up. Greets the user, lists their first few actions and links into the product.
component: email-welcome
category: emails
tags: [email, welcome, onboarding, transactional]
---

Built from the [Email Kit](/emails/email-kit), so it uses your theme tokens (converted to hex,
since inboxes can't read CSS variables) and switches to your dark palette when the inbox does.
Keep `steps` to two or four items. More than that reads as a manual, not a welcome.

## Send it

Render to HTML and plain text on the server, then send both parts. The examples use
[Resend](https://resend.com); any provider that takes `html` and `text` works the same way.

SvelteKit, `src/routes/api/welcome/+server.ts` (`pnpm add @better-svelte-email/server resend`):

```ts
import { pixelBasedPreset, Renderer, toPlainText } from "@better-svelte-email/server";
import { Resend } from "resend";
import { env } from "$env/dynamic/private";
import EmailWelcome from "$lib/components/emails/email-welcome/email-welcome.svelte";
import { emailTailwindConfig } from "$lib/email-theme";

const renderer = new Renderer({
	tailwindConfig: { ...emailTailwindConfig, presets: [pixelBasedPreset] },
});

export async function POST({ request }) {
	const { email, name } = await request.json();
	const html = await renderer.render(EmailWelcome, {
		props: {
			productName: "Acme",
			recipientName: name,
			actionUrl: "https://acme.com/dashboard",
			steps: [{ title: "Invite your team", description: "Teammates join with the role you pick." }],
			companyLines: ["Acme, Inc.", "1 Main St, Springfield"],
		},
	});
	await new Resend(env.RESEND_API_KEY).emails.send({
		from: "Acme <hello@acme.com>",
		to: email,
		subject: "Welcome to Acme",
		html,
		text: toPlainText(html),
	});
	return new Response(null, { status: 204 });
}
```

Next.js, `app/api/welcome/route.ts` (`pnpm add resend`; `react-email` is already installed):

```tsx
import { render } from "react-email";
import { Resend } from "resend";
import { EmailWelcome } from "@/components/emails/email-welcome/email-welcome";

export async function POST(request: Request) {
	const { email, name } = await request.json();
	const message = (
		<EmailWelcome
			productName="Acme"
			recipientName={name}
			actionUrl="https://acme.com/dashboard"
			steps={[{ title: "Invite your team", description: "Teammates join with the role you pick." }]}
			companyLines={["Acme, Inc.", "1 Main St, Springfield"]}
		/>
	);
	await new Resend(process.env.RESEND_API_KEY).emails.send({
		from: "Acme <hello@acme.com>",
		to: email,
		subject: "Welcome to Acme",
		html: await render(message),
		text: await render(message, { plainText: true }),
	});
	return new Response(null, { status: 204 });
}
```

`logoUrl` and every link must be absolute `https://` URLs. The preview line should add to the
subject, not repeat it.
