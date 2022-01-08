module.exports = (eleventyConfig) => {
  // Passthrough File Copy entries are relative to the root of your project and not your Eleventy input directory.
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Add markdown filter to include markdown files in nunjucks
  eleventyConfig.addFilter("markdown", function (value) {
    let markdownIt = require("markdown-it");
    let markdownItEmoji = require("markdown-it-emoji");
    let options = {
      html: true,
    };
    let markdownLib = markdownIt(options).use(markdownItEmoji);
    return markdownLib.render(value);
  });

  return {
    dir: {
      input: "./src",
      output: "dist",
    },
  };
};
