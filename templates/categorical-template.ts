import type { Question, Templates } from "../types";

type CategoricalOption = Extract<Question, { type: "categorical" }>["options"][number];

function openTextboxSuffix(
	openTextbox: NonNullable<CategoricalOption["openTextbox"]>,
): string {
	const { name: otName, dataType, min, max } = openTextbox;
	const range =
		min != null && max != null
			? `[${min}..${max}]`
			: max != null
				? `[..${max}]`
				: min != null
					? `[${min}..]`
					: null;

	switch (dataType) {
		case "singleline-text": {
			const r = range ?? "[1..500]";
			return ` other(${otName} "" text ${r})`;
		}
		case "multiline-text": {
			const r = range ?? "[1..4000]";
			return ` other(${otName} "" style(control(type="MultiLineEdit")) text ${r})`;
		}
		case "long": {
			const r = range ?? (min != null ? `[${min}..]` : "[0..]");
			return ` other(${otName} "" long ${r})`;
		}
		case "double":
			return ` other(${otName} "" double)`;
		default:
			return "";
	}
}

export const categoricalTemplate: Templates["categorical"] = ({
	name,
	label,
	options,
	isMultiple,
	isRandom,
}) => {
	const range = isMultiple ? "" : "1";
	const optionsString = options
		.map(({ name: optName, label: optLabel, openTextbox, isExclusive, isFixed }) => {
			const ot = openTextbox ? openTextboxSuffix(openTextbox) : "";
			const exclusive = isExclusive ? " exclusive" : "";
			const fix = isRandom && isFixed ? " fix" : "";
			return `    ${optName} "${optLabel}"${ot}${exclusive}${fix}`;
		})
		.join(",\n");

	return `${name} "${label}"\ncategorical [1..${range}]\n{\n${optionsString}\n}${isRandom ? " ran" : ""};`;
};
