import { MacKeyboard } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [pressed, setPressed] = useState<string[]>([]);
	return <MacKeyboard pressed={pressed} onPressedChange={setPressed} />;
}
