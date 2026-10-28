<script lang="ts">
import { IconChat, IconDownload, IconHelp, IconUserCircle } from "@baby-ui/icons";
import {
	Button,
	type ThemePreference,
	UserMenu,
	type UserMenuItem,
} from "@baby-ui/svelte";
import { setMode, userPrefersMode } from "mode-watcher";
import { signOut } from "#lib/account.js";
import GetProButton from "#lib/components/get-pro-button.svelte";
import { GITHUB_URL } from "#lib/github-stars.js";
import { session } from "#lib/session.svelte.js";
import { goto } from "$app/navigation";
import { page } from "$app/state";

const user = $derived(
	session.current && {
		name: session.current.email.split("@")[0] ?? session.current.email,
		email: session.current.email,
		plan: session.current.plan === "pro" ? "Pro" : undefined,
	},
);

const items: UserMenuItem[] = [
	{ label: "Account", icon: accountIcon, onSelect: () => void goto("/account") },
	{
		label: "Downloads",
		icon: downloadIcon,
		onSelect: () => void goto("/account/downloads"),
	},
	{
		label: "Feedback",
		icon: feedbackIcon,
		onSelect: () => window.open(`${GITHUB_URL}/discussions`, "_blank", "noopener"),
	},
	{ label: "Support", icon: supportIcon, onSelect: () => void goto("/docs") },
];

// The class toggles in the same tick as mode-watcher so the theme never flashes.
function pickTheme(next: ThemePreference) {
	setMode(next);
	const dark =
		next === "dark" ||
		(next === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
	document.documentElement.classList.toggle("dark", dark);
}

// Coming back to the sign-in page after signing in from it would loop.
const loginHref = $derived(
	page.url.pathname.startsWith("/login")
		? "/login"
		: `/login?next=${encodeURIComponent(page.url.pathname)}`,
);

async function leave() {
	await signOut();
	session.signOut();
	if (page.url.pathname.startsWith("/account")) await goto("/login");
}
</script>

{#snippet accountIcon()}<IconUserCircle aria-hidden="true" class="size-4 text-muted-foreground" />{/snippet}
{#snippet downloadIcon()}<IconDownload aria-hidden="true" class="size-4 text-muted-foreground" />{/snippet}
{#snippet feedbackIcon()}<IconChat aria-hidden="true" class="size-4 text-muted-foreground" />{/snippet}
{#snippet supportIcon()}<IconHelp aria-hidden="true" class="size-4 text-muted-foreground" />{/snippet}

{#if session.current?.plan !== "pro"}<GetProButton class="h-8" />{/if}
{#if user}
	<UserMenu
		{user}
		{items}
		theme={userPrefersMode.current}
		onThemeChange={pickTheme}
		onSignOut={leave}
		size="sm"
	/>
{:else}
	<Button
		href={loginHref}
		variant="ghost"
		size="sm"
		class="h-8 rounded-full px-3"
	>
		Log in
	</Button>
{/if}
