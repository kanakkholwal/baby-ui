<script lang="ts">
import "./layout.css";
import { ModeWatcher } from "mode-watcher";
import { onMount } from "svelte";
import { afterNavigate, beforeNavigate } from "$app/navigation";
import { page } from "$app/state";
import { initAnalytics, setAnalyticsContext, track } from "$lib/analytics";
import NavProgress from "$lib/components/nav-progress.svelte";
import PreferencesPanel from "$lib/components/preferences-panel.svelte";
import SiteHeader from "$lib/components/site-header.svelte";
import { prefs } from "$lib/preferences.svelte";

let { children } = $props();

$effect(() => prefs.apply());
$effect(() => {
	setAnalyticsContext({
		framework: prefs.framework,
		dialect: prefs.dialect,
		pm: prefs.pm,
	});
});
onMount(() => void initAnalytics());

// The landing view is sent by initAnalytics; client-side route changes are ours to send.
const changesPage = (from?: URL, to?: URL) => from?.pathname !== to?.pathname;
beforeNavigate(({ from, to, willUnload }) => {
	if (!willUnload && changesPage(from?.url, to?.url)) track("$pageleave");
});
afterNavigate(({ from, to, type }) => {
	// Read `page`: on the first ("enter") navigation, `to.route` and `to.params` are empty.
	const onComponent = page.route.id === "/components/[category]/[slug]";
	setAnalyticsContext({
		component: onComponent ? page.params.slug : null,
		category: onComponent ? page.params.category : null,
	});
	if (type !== "enter" && changesPage(from?.url, to?.url)) track("$pageview");
});
</script>

<ModeWatcher />
<NavProgress />
<SiteHeader />
<PreferencesPanel />
<div class="pt-14">{@render children()}</div>
