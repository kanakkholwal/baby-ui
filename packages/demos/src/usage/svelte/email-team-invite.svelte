<script lang="ts">
import { EmailTeamInvite } from "@baby-ui/svelte";
</script>

<EmailTeamInvite
	productName="Acme"
	inviterName="Grace Hopper"
	teamName="Design"
	role="Editor"
	acceptUrl="https://acme.com/invite/accept?token=..."
	expiresIn="7 days"
	companyLines={["Acme, Inc.", "1 Main St, Springfield"]}
/>
