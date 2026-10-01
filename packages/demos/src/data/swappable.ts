/** Sample data for the Swappable demos: a dashboard, a kanban board and a reorderable list. */

export type SlotMap = Array<{ slot: string; item: string }>;

export const SWAPPABLE_LAYOUTS = ["dashboard", "kanban", "list"] as const;
export type SwappableLayout = (typeof SWAPPABLE_LAYOUTS)[number];

/** Bento slots: the wide ones span two columns, so a swapped card reflows to its new size. */
export const DASHBOARD_SLOTS = [
	{ id: "a", span: "" },
	{ id: "b", span: "sm:col-span-2" },
	{ id: "c", span: "sm:col-span-2" },
	{ id: "d", span: "" },
];

export const TODOS = [
	"Ship the kanban demo",
	"Review swap motion",
	"Write the docs page",
];

export const SALES =
	"M0 60 C40 60 60 30 100 32 S160 52 200 40 S260 10 300 18 L300 80 L0 80 Z";

export type KanbanCard = { id: string; title: string; tag: string };

export const KANBAN_CARDS: KanbanCard[] = [
	{ id: "auth", title: "Passkey sign-in", tag: "Feature" },
	{ id: "billing", title: "Annual billing toggle", tag: "Billing" },
	{ id: "search", title: "Search keyboard shortcuts", tag: "UX" },
	{ id: "export", title: "CSV export", tag: "Feature" },
	{ id: "a11y", title: "Contrast audit", tag: "A11y" },
];

export const KANBAN_COLUMNS = [
	{ id: "todo", label: "To do" },
	{ id: "doing", label: "In progress" },
	{ id: "done", label: "Done" },
];

/** Every column has fixed slots; empty ones (item "") are where cards can move. */
export const KANBAN_MAP: SlotMap = [
	{ slot: "todo-0", item: "auth" },
	{ slot: "todo-1", item: "billing" },
	{ slot: "todo-2", item: "" },
	{ slot: "doing-0", item: "search" },
	{ slot: "doing-1", item: "export" },
	{ slot: "doing-2", item: "" },
	{ slot: "done-0", item: "a11y" },
	{ slot: "done-1", item: "" },
	{ slot: "done-2", item: "" },
];

export const LIST_ITEMS = [
	{ id: "design", label: "Design review" },
	{ id: "build", label: "Build the component" },
	{ id: "test", label: "Write the tests" },
	{ id: "docs", label: "Document the API" },
];
