const { startDevServer } = require("@cypress/webpack-dev-server");
const webpackConfig = require("../../webpack.config");

module.exports = (on, config) => {
  on("dev-server:start", (options) =>
    startDevServer({
      options,
      webpackConfig,
    })
  );
  require("ts-node").register({
    project: "../../tsconfig.json",
  });
  return config;
};
