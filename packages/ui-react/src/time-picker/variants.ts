import type { VariantProps } from "tailwind-variants";
import type { dateField } from "../date-field/variants";

export type TimePickerSize = NonNullable<VariantProps<typeof dateField>["size"]>;
