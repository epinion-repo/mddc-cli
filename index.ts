import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { questionSchema } from "./schemas/index";
import { templates } from "./templates/templates";

// ── Functions ────────────────────────────────────────────────────────────

/**
 * Generate the JSON schema file from the Zod question schema.
 * @param outputPath The path where the schema will be saved.
 */
export const generateSchema = (outputPath: string) => {
	const output = JSON.stringify(
		zodTextFormat(questionSchema, "questionsSchema"),
	);

	let finalPath = outputPath;
	if (existsSync(finalPath) && statSync(finalPath).isDirectory()) {
		finalPath = resolve(finalPath, "mddc-schema.json");
	}

	writeFileSync(finalPath, output, "utf-8");
	console.log(`✅ Schema written to ${finalPath}`);
};

/**
 * Convert a .mddc JSON file to .mdd format.
 * @param inputPath The path to the input .mddc file.
 * @param outputPath The path to the output .mdd file.
 */
export const toMdd = (inputPath: string, outputPath: string) => {
	if (!existsSync(inputPath)) {
		console.error(`❌ Error: Input file ${inputPath} does not exist.`);
		process.exit(1);
	}

	let finalPath = outputPath;
	if (existsSync(finalPath) && statSync(finalPath).isDirectory()) {
		finalPath = resolve(finalPath, `${basename(inputPath, ".mddc")}.mdd`);
	}

	const mddc = readFileSync(inputPath, "utf-8");
	const mddToolOutputSchema = z.array(questionSchema);
	if (!mddToolOutputSchema.safeParse(JSON.parse(mddc)).success) {
		console.error("❌ Error: Invalid MDDC format.");
		process.exit(1);
	}
	const questions = mddToolOutputSchema.parse(JSON.parse(mddc));
	const mdd = questions
		.map((question) => {
			// Cast type to 'never' as per original code templates generic handling
			return templates[question.type](question as never);
		})
		.join("\n\n");
	writeFileSync(finalPath, mdd, "utf-8");
	console.log(`✅ MDD written to ${finalPath}`);
};
