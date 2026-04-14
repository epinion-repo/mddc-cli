import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { questionSchema } from "./schemas/index";
import { templates } from "./templates/templates";

// ── Commands ────────────────────────────────────────────────────────────

/**
 * Generate the JSON schema file from the Zod question schema.
 * Usage: mddc schema
 */
const generateSchema = () => {
	const output = JSON.stringify(
		zodTextFormat(questionSchema, "questionsSchema"),
	);
	const outputPath = resolve(__dirname, "mddc-schema.json");

	writeFileSync(outputPath, output, "utf-8");
	console.log(`✅ Schema written to ${outputPath}`);
};

/**
 * Convert a .mddc JSON file to .mdd format.
 * Usage: mddc parse <input.mddc> <output.mdd>
 */
const toMdd = (inputPath: string, outputPath: string) => {
	if (!existsSync(inputPath)) {
		console.error(`❌ Error: Input file ${inputPath} does not exist.`);
		process.exit(1);
	}
	const mddc = readFileSync(inputPath, "utf-8");
	const mddToolOutputSchema = z.array(questionSchema);
	if (!mddToolOutputSchema.safeParse(JSON.parse(mddc)).success) {
		console.error("❌ Error: Invalid MDDC format.");
		process.exit(1);
	}
	const questions = mddToolOutputSchema.parse(JSON.parse(mddc));
	const mdd = questions
		.map((question) => templates[question.type](question as never))
		.join("\n\n");
	writeFileSync(outputPath, mdd, "utf-8");
	console.log(`✅ MDD written to ${outputPath}`);
};

// ── CLI Entry Point ─────────────────────────────────────────────────────

const USAGE = `
Usage:
  mddc schema                          Generate mddc-schema.json
  mddc parse <input.mddc> <output.mdd>  Convert MDDC to MDD

  (or: npx tsx index.ts <command> ...)
`.trim();

const main = () => {
	const args = process.argv.slice(2);
	const command = args[0];

	switch (command) {
		case "schema":
			generateSchema();
			break;

		case "parse": {
			const input = args[1];
			const output = args[2];

			if (!input || !output) {
				console.error("❌ Error: Missing arguments for 'parse' command.");
				console.error("   Usage: mddc parse <input.mddc> <output.mdd>");
				process.exit(1);
			}

			const inputPath = resolve(process.cwd(), input);
			const outputPath = resolve(process.cwd(), output);

			toMdd(inputPath, outputPath);
			break;
		}

		default:
			console.error(
				command
					? `❌ Unknown command: "${command}"`
					: "❌ No command provided.",
			);
			console.error(USAGE);
			process.exit(1);
	}
};

main();

export { main };
