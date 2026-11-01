<script lang="ts">
import {
	Question,
	QuestionContent,
	QuestionFooter,
	QuestionHeader,
	type QuestionItem,
	QuestionResult,
} from "@baby-ui/svelte";

const questions: QuestionItem[] = [
	{
		id: "port",
		title: "Which port do you want?",
		options: [
			{ value: "react", label: "React" },
			{ value: "svelte", label: "Svelte" },
			{ value: "both", label: "Both" },
		],
	},
];
</script>

<Question {questions} onSubmit={(answers) => console.log(answers)}>
	<QuestionHeader />
	<QuestionContent />
	<QuestionFooter />
	<QuestionResult />
</Question>
