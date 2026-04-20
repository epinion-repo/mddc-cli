import type { Templates } from "../types";

export const infoTemplate: Templates["info"] = ({ name, label }) =>
	`${name} "${label}" info;`;
