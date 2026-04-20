# mddc-cli

CLI tool for converting MDDC JSON files to MDD format.

## Installation

Requires access to the `@epinion-repo` GitHub Packages registry. Add the following to your `.npmrc`:

```
@epinion-repo:registry=https://npm.pkg.github.com
```

Then install globally:

```bash
npm install -g @epinion-repo/mddc-cli
```

## Commands

```
mddc parse <input> <output>   Convert a .mddc file to .mdd
mddc schema                   Generate mddc-schema.json
mddc update                   Upgrade to the latest version
mddc -v, --version            Show current version
mddc -h, --help               Show help
```

### Examples

```bash
# Convert MDDC to MDD
mddc parse ./survey.mddc ./survey.mdd

# Generate the JSON schema file
mddc schema

# Upgrade the CLI
mddc update
```