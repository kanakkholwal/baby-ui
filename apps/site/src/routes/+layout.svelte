<script lang="ts">
import "./layout.css";
import PreferencesPanel from "$lib/components/preferences-panel.svelte";
import SiteHeader from "$lib/components/site-header.svelte";
import { prefs } from "$lib/preferences.svelte";

let { children } = $props();

$effect(() => prefs.hydrate());
</script>

<SiteHeader />
<PreferencesPanel />
<div class="pt-14">{@render children()}</div>
