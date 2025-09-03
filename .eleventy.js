const htmlmin = require("html-minifier-terser");

module.exports = function(eleventyConfig) {
  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
      return minified;
    }
    return content;
  });

// Pretty date for Nunjucks (no extra deps needed)
eleventyConfig.addFilter("fmtDate", (dateObj, locale = "en-AU", tz = "Australia/Sydney") => {
  if (!dateObj) return "";
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short", // Sep, Oct, …
    year: "numeric",
    timeZone: tz
  }).format(dateObj);
});





  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
  eleventyConfig.addWatchTarget("./src/styles/");
  eleventyConfig.addPassthroughCopy({ "src/javascript": "javascript" });
  eleventyConfig.addWatchTarget("./src/javascript")
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addWatchTarget("./src/images/");
  eleventyConfig.addPassthroughCopy({ "src/other files": "other files" });

  // Optional: live reload when these change
  eleventyConfig.addWatchTarget("src/style.css");
  eleventyConfig.addWatchTarget("src/javascript");

  return {
    dir: { input: "src", includes: "_includes", output: "public" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };
};