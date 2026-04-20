import type { Templates } from "../types";

export const textboxTemplate: Templates["openTextbox"] = ({
	name,
	label,
	min,
	max,
	dataType,
}) =>
	`${name} "${label}" ${dataType === "number" ? "long" : "text"}[${min}..${max}];`;
