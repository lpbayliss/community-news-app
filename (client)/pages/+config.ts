import vikeReact from "vike-react/config";
import vikeReactQuery from "vike-react-query/config";

import type { Config } from "vike/types";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
	stream: "web",
	// https://vike.dev/Layout
	// https://vike.dev/head-tags
	title: "My Vike App",
	description: "Demo showcasing Vike",

	extends: [vikeReact, vikeReactQuery],
} satisfies Config;
