import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "../preset.ts", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  }
};
export default config;
