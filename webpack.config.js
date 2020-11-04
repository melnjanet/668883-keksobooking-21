const path = require(`path`);

module.exports = {
  entry: [
    `./js/constants.js`,
    `./js/util.js`,
    `./js/errors.js`,
    `./js/backend.js`,
    `./js/filters.js`,
    `./js/pin.js`,
    `./js/dragging.js`,
    `./js/main-pin.js`,
    `./js/map.js`,
    `./js/success.js`,
    `./js/card.js`,
    `./js/photo.js`,
    `./js/form.js`,
    `./js/page.js`,
    `./js/main.js`
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "js"),
    iife:  true
  },
  devtool: false
};
