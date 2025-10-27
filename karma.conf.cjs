// Archivo: karma.conf.cjs
const karmaJasmine = require("karma-jasmine");
const karmaChromeLauncher = require("karma-chrome-launcher");
const karmaWebpack = require("karma-webpack");
const karmaJasmineHtmlReporter = require("karma-jasmine-html-reporter");

module.exports = function (config) {
  config.set({
    basePath: "",
    // 👇 Aquí se registra el adaptador Jasmine
    frameworks: ["jasmine"],

    files: [
      "src/**/*.test.js",
      "src/__tests__/**/*.js"
    ],

    preprocessors: {
      "src/**/*.test.js": ["webpack"],
      "src/__tests__/**/*.js": ["webpack"]
    },

    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
              }
            }
          }
        ]
      },
      resolve: {
        extensions: [".js", ".jsx"]
      }
    },

    reporters: ["progress", "kjhtml"],

    browsers: ["ChromeHeadless"], // o "Chrome"
    autoWatch: true,
    singleRun: false,

    // 👇 Plugins cargados manualmente (clave para evitar el error)
    plugins: [
      karmaJasmine,
      karmaChromeLauncher,
      karmaWebpack,
      karmaJasmineHtmlReporter
    ],

    client: {
      clearContext: false, // mantiene visible el reporte en el navegador
      jasmine: { random: false }
    }
  });
};
