const htmlmin = require("html-minifier-terser");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  


eleventyConfig.addPlugin(pluginRss);

// --- RSS helper filters (no plugin required) ---
eleventyConfig.addFilter("absoluteUrl", (path, base) => {
  try { return new URL(path, base).toString(); }
  catch { return path; }
});
eleventyConfig.addFilter("dateToRfc3339", (dateObj) => {
  try { return new Date(dateObj).toISOString(); } catch { return ""; }
});
eleventyConfig.addFilter("getNewestCollectionItemDate", (collection) => {
  if (!Array.isArray(collection) || collection.length === 0) return "";
  let max = collection.reduce((a, b) => (a.date > b.date ? a : b));
  return max.date;
});
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
  eleventyConfig.addPassthroughCopy({ "./src/assets/": "assets"});

  return {
    dir: { input: "src", includes: "_includes", output: "public" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };
};