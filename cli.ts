#!/usr/bin/env node --no-warnings --import=tsx
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { generateSchema, toMdd } from "./index.js";

const USAGE = `
Usage:
  mddc schema <output_path>                          Generate schema JSON
  mddc mdd <input_path> <output_path>                Convert MDDC to MDD
  mddc -v, --version                                 Show version
`.trim();

const main = () => {
	const args = process.argv.slice(2);
	const command = args[0];

	if (command === "-v" || command === "--version") {
		const packageJsonPath = new URL("./package.json", import.meta.url);
		const pkg = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		console.log(`v${pkg.version}`);
		process.exit(0);
	}

	switch (command) {
		case "schema": {
			const output = args[1];

			if (!output) {
				console.error("❌ Error: Missing output_path for 'schema' command.");
				console.error("   Usage: mddc schema <output_path>");
				process.exit(1);
			}

			const outputPath = resolve(process.cwd(), output);
			generateSchema(outputPath);
			break;
		}

		case "mdd": {
			const input = args[1];
			const output = args[2];

			if (!input || !output) {
				console.error("❌ Error: Missing arguments for 'mdd' command.");
				console.error("   Usage: mddc mdd <input_path> <output_path>");
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
