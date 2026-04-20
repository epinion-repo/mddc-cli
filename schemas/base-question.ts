import z from "zod";

export const baseQuestionSchema = z.object({
	name: z
		.string()
		.describe(
			"Unique identifier for the question. Usually defined in the questionnaire. If not, must follow the pattern `QN` where N is a sequential integer starting from 1 (e.g., `Q1`, `Q2`, `Q3`).",
		),
	label: z
		.string()
		.describe(
			"The raw text of the question presented to the respondent. May include HTML tags for formatting. Must use `\n` for line breaks.",
		),
	
});
