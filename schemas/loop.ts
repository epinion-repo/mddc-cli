import z from "zod";
import { categoricalQuestionSchema } from "./categorical";

export const loopQuestionSchema = categoricalQuestionSchema
	.omit({ type: true })
	.extend({
		type: z
			.literal("loop")
			.describe("Identifies this as a loop/grid/table question."),
		subQuestions: z
			.array(
				z.object({
					name: z
						.string()
						.describe(
							"Unique identifier for the question. Usually defined in the questionnaire. If not, must follow the pattern `_N` where N is a sequential integer starting from 1 (e.g., `_1`, `_2`, `_3`).",
						),
					label: z
						.string()
						.describe(
							"The raw text of the question presented to the respondent. May include HTML tags for formatting.",
						),
				}),
			)
			.describe(
				"An array of sub-questions. Usually is the first column or the first row of the grid/table.",
			),
		isReversed: z
			.boolean()
			.describe(
				"If `false`, the sub-questions are presented at the first column. If `true`, the sub-questions are presented at the first row.",
			),
	})
	.describe(
		"A loop question where respondents select one or multiple options for each sub-question. The sub-questions are the rows and the options are the columns.",
	);
