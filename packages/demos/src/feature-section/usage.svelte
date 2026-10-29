<script lang="ts">
import {
	FeatureSection,
	FeatureSectionHeader,
	FeatureSectionIcon,
	FeatureSectionItem,
	FeatureSectionItemDescription,
	FeatureSectionItemTitle,
	FeatureSectionList,
	FeatureSectionTitle,
} from "@baby-ui/svelte";
</script>

<FeatureSection variant="cards">
	<FeatureSectionHeader>
		<FeatureSectionTitle>Everything a fast team needs</FeatureSectionTitle>
	</FeatureSectionHeader>
	<FeatureSectionList>
		<FeatureSectionItem>
			<FeatureSectionIcon>
				<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
					<path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />
				</svg>
			</FeatureSectionIcon>
			<FeatureSectionItemTitle>Instant sync</FeatureSectionItemTitle>
			<FeatureSectionItemDescription>Edits land for everyone in under a second.</FeatureSectionItemDescription>
		</FeatureSectionItem>
	</FeatureSectionList>
</FeatureSection>
