import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@chromatic-com/storybook",
		"@storybook/experimental-addon-test",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {
			builder: {
				viteConfigPath: "vite.storybook.config.ts",
			},
		},
	},
	typescript: {
		// Enables the `react-docgen-typescript` parser.
		// See https://storybook.js.org/docs/api/main-config/main-config-typescript for more information about this option.
		reactDocgen: "react-docgen-typescript",
	},
};

export default config;
