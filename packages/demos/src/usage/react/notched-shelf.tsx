import { NotchedShelf } from "@baby-ui/react";

export function Example() {
	return (
		<footer className="rounded-t-[2rem] border-t bg-card">
			<NotchedShelf>
				<a href="#top" className="px-5 font-medium text-sm">
					Back to top
				</a>
			</NotchedShelf>
		</footer>
	);
}
