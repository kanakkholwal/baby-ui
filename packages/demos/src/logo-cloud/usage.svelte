<script lang="ts">
import {
	LogoCloud,
	LogoCloudContent,
	LogoCloudItem,
	LogoCloudLink,
	LogoCloudList,
	LogoCloudTitle,
} from "@baby-ui/svelte";
</script>

<LogoCloud variant="grid">
	<LogoCloudTitle>Trusted by product teams at</LogoCloudTitle>
	<LogoCloudContent>
		<LogoCloudList>
			<LogoCloudItem>
				<img src="/logos/acme.svg" alt="Acme" width="24" height="24" />
			</LogoCloudItem>
		</LogoCloudList>
		<LogoCloudLink href="/customers">See all customers</LogoCloudLink>
	</LogoCloudContent>
</LogoCloud>
