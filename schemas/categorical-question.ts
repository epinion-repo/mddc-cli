import z from "zod";
import { baseQuestionSchema } from "./base-question";

export const categoricalQuestionSchema = baseQuestionSchema
	.extend({
		type: z.literal("categorical"),
		options: z.array(
			z.object({
				name: z
					.string()
					.describe(
						"Unique identifier for the option. Must follow the pattern `_N` where N is a sequential integer starting from 1 (e.g., `_1`, `_2`, `_3`).",
					),
				label: z
					.string()
					.describe(
						"The raw text of the option presented to the respondent. May include HTML tags for formatting. Must use `\n` for line breaks.",
					),
				openTextbox: z
					.object({
						name: z
							.string()
							.describe(
								"Unique identifier for the open textbox linked to this option. Must follow the pattern `oN`, where N matches the numeric index of the option (e.g., if option name is `_1`, textbox name must be `o1`).",
							),
						dataType: z
							.enum(["singleline-text", "multiline-text", "long", "double"])
							.describe(
								"Specifies the expected input type for the open textbox. Allowed values: `singleline-text` (short free-text, max 500 chars), `multiline-text` (long free-text such as comments or feedback, max 4000 chars), `long` (integer/numeric input). The value `double` is present for schema compatibility only and MUST NOT be used; always choose one of the three allowed types.",
							),
						min: z
							.number()
							.nullable()
							.describe(
								"Minimum constraint. For `long`: infer from context or default to `0`. For `singleline-text` or `multiline-text`: use `1`.",
							),
						max: z
							.number()
							.nullable()
							.describe(
								"Maximum constraint. For `long`: infer from context or default to `null` (no limit). For `singleline-text`: use `500`. For `multiline-text`: use `4000`.",
							),
					})
					.nullable()
					.describe(
						"Defines an additional input field associated with this option. Use when the respondent must provide extra information (e.g., 'Other: please specify'). Provide `null` if no extra input is required.",
					),
				isExclusive: z
					.boolean()
					.describe(
						"Typically defined in the questionnaire or inferred from the option content. If true, selecting this option prevents choosing any other options (e.g., “None of the above” or “Don't know”).",
					),
				isFixed: z.boolean().describe(
					"If the question is not random, this field always be `false`. Else, if the option is exclusive or open textbox, this field always be `true`. Else, default to `false`. Fixed option will not be randomized.",
				)
			}),
		),
		isMultiple: z
			.boolean()
			.describe(
				"If `true`, respondents may select multiple options (checkboxes). If `false`, only one option may be selected (radio buttons).",
			),
		isRandom: z
			.boolean()
			.describe(
				"If `true`, the presentation order of the options must be randomized when displayed.",
			),
	})
	.describe(
		"A categorical question where respondents choose one or more options from a predefined list (Single Choice or Multiple Choice).",
	);
