const pluginWebc = require("@11ty/eleventy-plugin-webc");
const { eleventyImagePlugin } = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const { format } = require("date-fns/format");

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("./README.md");

  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      "_components/**/*.webc",
      "npm:@11ty/eleventy-img/*.webc",
      "npm:@11ty/is-land/*.webc",
    ],
  });

  eleventyConfig.addPlugin(eleventyImagePlugin, {
    formats: ["webp", "jpeg", "png"],
    urlPath: "/img/",

    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  eleventyConfig.addPassthroughCopy("fonts/*.ttf");
  eleventyConfig.addPassthroughCopy("fonts/*.woff2");

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: false,
      linkify: true,
      typographer: true,
    }),
  );

  eleventyConfig.addFilter("date-only", function (d) {
    return format(d, "MMM do, yyyy");
  });
};
