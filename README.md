# MDDC Helper Script

This script provides utilities for the `mdd-converter` skill. It is designed to be used by AI agents to convert structured MDDC JSON data into the MDD programming language format.

## 🚀 Usage for AI Agents

To convert an MDDC JSON file to an MDD file, use the following command:

```bash
npx tsx index.ts parse <input_path> <output_path>
```

### Arguments:
1. `parse`: The command name.
2. `<input_path>`: Absolute or relative path to the source `.mddc` (JSON) file.
3. `<output_path>`: Absolute or relative path where the resulting `.mdd` file should be saved.

### Example:
```bash
npx tsx index.ts parse ./project/survey.mddc ./project/survey.mdd
```

## ⚠️ Important Rules (FOR AI ONLY)

- **DO NOT** use the `schema` command (e.g., `npx tsx index.ts schema`). This command is reserved for developers to update the internal Zod schema and is NOT part of the conversion workflow.
- Use `npx tsx` to execute the script directly from the source `index.ts`.
- The script will validate the input against the required question schemas. If validation fails, it will exit with an error.

## Technical Details
- **Logic**: The script reads the JSON input, parses it using Zod schemas defined in `./schemas`, and maps each question type to a corresponding string template in `./templates`.
- **Environment**: Requires Node.js and the dependencies listed in `package.json`.