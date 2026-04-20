import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { Command } from "commander";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import pkg from "./package.json";
import { questionSchema } from "./schemas";
import { templates } from "./templates";
import type { Question } from "./types";

// ── Commands ────────────────────────────────────────────────────────────

const generateSchema = () => {
	const output = JSON.stringify(
		zodTextFormat(questionSchema as never, "questionsSchema"),
	);
	const outputPath = resolve(__dirname, "mddc-schema.json");
	writeFileSync(outputPath, output, "utf-8");
	console.log(`✅ Schema written to ${outputPath}`);
};

const toMdd = (inputPath: string, outputPath: string) => {
	if (!existsSync(inputPath)) {
		console.error(`❌ Input file not found: ${inputPath}`);
		process.exit(1);
	}
	const mddc = readFileSync(inputPath, "utf-8");
	const mddToolOutputSchema = z.array(questionSchema);

	let questions: Question[];
	try {
		questions = mddToolOutputSchema.parse(JSON.parse(mddc));
	} catch (error) {
		console.error(`❌ Invalid MDDC format: ${error}`);
		process.exit(1);
	}

	const mdd = questions
		.map((question) => templates[question.type](question as never))
		.join("\n\n");
	writeFileSync(outputPath, mdd, "utf-8");
	console.log(`✅ MDD written to ${outputPath}`);
};

// ── CLI ─────────────────────────────────────────────────────────────────

const program = new Command();

program
	.name("mddc")
	.description("Convert MDDC JSON to MDD format")
	.version(pkg.version, "-v, --version", "Show current version");

program
	.command("schema")
	.description("Generate mddc-schema.json in the current directory")
	.action(generateSchema);

program
	.command("parse")
	.description("Convert a .mddc file to .mdd")
	.argument("<input>", "Path to the source .mddc (JSON) file")
	.argument("<output>", "Path for the output .mdd file")
	.action((input: string, output: string) => {
		toMdd(resolve(process.cwd(), input), resolve(process.cwd(), output));
	});

program
	.command("update")
	.description("Upgrade mddc-cli to the latest version")
	.action(() => {
		console.log("Updating mddc-cli...");
		execSync("npm update -g @epinion-repo/mddc-cli", { stdio: "inherit" });
	});

export const main = () => program.parse();
