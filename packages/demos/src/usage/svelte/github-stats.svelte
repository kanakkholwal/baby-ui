<script lang="ts">
import { GithubStats } from "@baby-ui/svelte";
import { DEMO_GITHUB_STATS } from "../../data/github-stats";
</script>

<div class="w-full max-w-5xl">
	<GithubStats data={DEMO_GITHUB_STATS} locale="en-US" />
</div>
