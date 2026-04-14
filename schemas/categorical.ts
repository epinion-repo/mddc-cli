import z from "zod";
import { questionCoreSchema } from "./core";

export const categoricalQuestionSchema = questionCoreSchema
	.extend({
		type: z
			.literal("categorical")
			.describe("Identifies this as a categorical (multiple choice) question."),
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
						"The text displayed for this option. May include HTML tags for formatting. Must use `\n` for line breaks.",
					),
				openTextbox: z
					.object({
						name: z
							.string()
							.describe(
								"Unique identifier of the open textbox linked to this option. Must follow the pattern `oN`, where N matches the numeric index of the option (e.g., if option name is `_1`, textbox name must be `o1`).",
							),
						dataType: z
							.enum(["text", "long-text", "number"])
							.describe(
								"Specifies the expected input type for the open textbox. 'number' for numeric input, 'text' for short text, 'long-text' for multi-line text.",
							),
						min: z
							.number()
							.nullable()
							.describe(
								"Minimum allowed value (for `number`) or minimum character length (for `text` and `long-text`). Defaults to `0` if not provided.",
							),

						max: z
							.number()
							.nullable()
							.describe(
								"Maximum allowed value (for `number`) or maximum character length (for `text` and `long-text`). Defaults: `500` for `text`, `4000` for `long-text`, `null` (no limit) for `number`.",
							),
					})
					.nullable()
					.describe(
						"Defines an additional input field associated with this option. Use when the respondent must provide extra information (e.g., 'Other: please specify'). Provide `null` if no extra input is required.",
					),
				isExclusive: z
					.boolean()
					.describe(
						"If `true`, selecting this option will deselect all other options (e.g., used for 'None of the above' or 'Don\\'t know').",
					),
			}),
		),
		min: z
			.number()
			.nullable()
			.describe(
				"Minimum number of options that must be selected. Defaults to `1` if not provided.",
			),
		max: z
			.number()
			.nullable()
			.describe(
				"Maximum number of options that can be selected. Defaults to `1` if not provided.",
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
