const moment = require("moment");

moment.locale("en-sg");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("dateIso", (date) => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter("dateReadable", (date) => {
    return moment(date).utc().format("LL"); // E.g. May 31, 2019
  });

  eleventyConfig.addFilter("sgDate", (date) => {
    return moment(date, "DDMMYYYY").format("DD/MM/YYYY");
  });

  let markdownIt = require("markdown-it");

  const md = new markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).disable("code");

  eleventyConfig.addPairedShortcode("markdown", (content, inline = null) => {
    return inline ? md.renderInline(content) : md.render(content);
  });

  eleventyConfig.addPassthroughCopy("assets");
  return {
    passthroughFileCopy: true,
  };
};
