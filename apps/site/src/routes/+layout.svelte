<script lang="ts">
import "./layout.css";
import favicon from "$lib/assets/favicon.svg";
import PreferencesPanel from "$lib/components/preferences-panel.svelte";
import SiteHeader from "$lib/components/site-header.svelte";
import { prefs } from "$lib/preferences.svelte";

let { children } = $props();

$effect(() => prefs.hydrate());
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<SiteHeader />
<PreferencesPanel />
<div class="pt-14">{@render children()}</div>
