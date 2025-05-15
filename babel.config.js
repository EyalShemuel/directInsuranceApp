const plugin = require("tailwindcss");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      ["module-resolver", {
        alias: {
          '@i18n': './i18n'
        }
      }]
    ],
  };
};
