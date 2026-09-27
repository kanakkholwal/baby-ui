import { SearchInput } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [query, setQuery] = useState("");
	return (
		<SearchInput
			value={query}
			onValueChange={setQuery}
			shortcut="/"
			onSearch={(q) => console.log("search", q)}
		/>
	);
}
