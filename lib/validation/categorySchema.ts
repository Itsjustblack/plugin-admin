import { z } from "zod";
import { MINIMUM_PAYOUT_AMOUNT } from "../constants";

export const AmountSchema = z
	.number({
		error: (issue) => {
			if (issue.code === "invalid_type")
				return "Amount must be a number";
			return "Amount is required";
		},
	})
	.min(
		MINIMUM_PAYOUT_AMOUNT,
		`Amount must be at least ${MINIMUM_PAYOUT_AMOUNT.toLocaleString()} naira`
	);

const addCategorySchema = z
	.object({
		name: z
			.string()
			.min(1, { message: "Name is required." })
			.max(100, { message: "Name cannot exceed 100 characters." }),

		description: z
			.string()
			.max(500, { message: "Description cannot exceed 500 characters." }),

		min_price: z
			.number({
				error: (issue) => {
					if (issue.code === "invalid_type")
						return "Minimum price must be a number.";
					return "Invalid minimum price.";
				},
			})
			.min(MINIMUM_PAYOUT_AMOUNT, { 
				message: `Minimum price must be at least ${MINIMUM_PAYOUT_AMOUNT.toLocaleString()} naira.` 
			}),
	})
	.strict();

export const addCategoriesSchema = z.object({
	categories: z
		.array(addCategorySchema)
		.min(1, "At least one category is required"),
});

export type AddCategoriesFormValues = z.infer<typeof addCategoriesSchema>;
