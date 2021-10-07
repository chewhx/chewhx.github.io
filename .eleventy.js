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
    return moment(date, "DDMMYYYY").format("LL");
  });

  eleventyConfig.addFilter("fromNow", (value) => {
    return moment(value, "DDMMYYYY").fromNow();
  });

  eleventyConfig.addPassthroughCopy("assets");
  return {
    passthroughFileCopy: true,
  };
};
