<script lang="ts">
import { Question, type QuestionItem } from "@baby-ui/svelte";

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

<Question {questions} onSubmit={(answers) => console.log(answers)} />
