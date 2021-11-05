const moment = require("moment");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

moment.locale("en-sg");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter("dateReadable", (date) => {
    return moment(date).utc().format("LL"); // E.g. May 31, 2019
  });

  eleventyConfig.addFilter("sgDate", (date) => {
    return moment(date, "DDMMYYYY").format("DD/MM/YYYY");
  });

  let markdownIt = require("markdown-it");

  let md = new markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).disable("code");

  // Remember old renderer, if overridden, or proxy to default renderer
  var defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // If you are sure other plugins can't add `target` - drop check below
    var aIndex = tokens[idx].attrIndex("target");

    if (aIndex < 0) {
      tokens[idx].attrPush(["target", "_blank"]); // add new attribute
    } else {
      tokens[idx].attrs[aIndex][1] = "_blank"; // replace value of existing attr
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };
  // Solved by: https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer

  eleventyConfig.addPairedShortcode("markdown", (content, inline = null) => {
    return inline ? md.renderInline(content) : md.render(content);
  });

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("CNAME");
  return {
    passthroughFileCopy: true,
  };
};
