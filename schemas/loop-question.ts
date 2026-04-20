import z from "zod";
import { categoricalQuestionSchema } from "./categorical-question";

export const loopQuestionSchema = categoricalQuestionSchema
	.extend({
		type: z.literal("loop"),
		subQuestions: z
			.array(
				z.object({
					name: z
						.string()
						.describe(
							"Unique identifier for the question. Must follow the pattern `_N` where N is a sequential integer starting from 1 (e.g., `_1`, `_2`, `_3`).",
						),
					label: z
						.string()
						.describe(
							"The raw text of the sub-question presented to the respondent. May include HTML tags for formatting. Must use `\n` for line breaks.",
						),
				}),
			)
			.describe(
				"An array of sub-questions. Their position (leftmost column or top row) is determined by the isColumn flag.",
			),
		isColumn: z.boolean().describe(
			`Determines grid orientation. Default: false.
If false: subQuestions occupy the leftmost column (listed vertically); options occupy the top row (listed horizontally).
If true: subQuestions occupy the top row (listed horizontally); options occupy the leftmost column (listed vertically).

isColumn = false:
                 | option-1 | option-2 | option-3 |
sub-question-1   |          |          |          |
sub-question-2   |          |          |          |
sub-question-3   |          |          |          |

isColumn = true:
                 | sub-question-1 | sub-question-2 | sub-question-3 |
option-1         |                |                |                |
option-2         |                |                |                |
option-3         |                |                |                |
`,
		),
		isMultiple: z.boolean().describe(
			"If `true`, respondents may select multiple options per sub-question. If `false`, only one option per sub-question may be selected.",
		),
		isRandom: z.boolean().describe(
			"If `true`, the presentation order of the sub-questions must be randomized when displayed.",
		),
	})
	.describe(
		"A grid/table question where respondents select one or more options for each sub-question. Grid orientation (subQuestions as rows vs. columns) is controlled by the isColumn flag.",
	);
