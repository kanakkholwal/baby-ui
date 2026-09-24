<script lang="ts">
import "./layout.css";
import { ModeWatcher } from "mode-watcher";
import NavProgress from "$lib/components/nav-progress.svelte";
import PreferencesPanel from "$lib/components/preferences-panel.svelte";
import SiteHeader from "$lib/components/site-header.svelte";
import { prefs } from "$lib/preferences.svelte";

let { children } = $props();

$effect(() => prefs.apply());
</script>

<ModeWatcher />
<NavProgress />
<SiteHeader />
<PreferencesPanel />
<div class="pt-14">{@render children()}</div>
