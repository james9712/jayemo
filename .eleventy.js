// .eleventy.js
module.exports = function(eleventyConfig) {
  /* ----------------------------
   * Passthroughs & watch targets
   * ---------------------------- */
  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "src/javascript": "javascript" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });   // <- copies grid.png
  eleventyConfig.addWatchTarget("./src/style.css");
  eleventyConfig.addWatchTarget("./src/javascript");
  eleventyConfig.addWatchTarget("./src/assets");

  /* ----------------------------
   * Filters
   * ---------------------------- */

  // Pretty date for Nunjucks (used in post cards)
  eleventyConfig.addFilter("fmtDate", (dateObj, locale = "en-AU", tz = "Australia/Sydney") => {
    if (!dateObj) return "";
    return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric", timeZone: tz }).format(dateObj);
    // e.g., "01 Sep 2025"
  });

  // RSS helper filters (no plugin required)
  eleventyConfig.addFilter("absoluteUrl", (path, base) => {
    if (!path) return "";
    try { return new URL(path, base).toString(); }
    catch { return (base || "") + path; }
  });
  eleventyConfig.addFilter("dateToRfc3339", (d) => {
    const x = d instanceof Date ? d : new Date(d);
    return isNaN(x) ? "" : x.toISOString();
  });
  eleventyConfig.addFilter("getNewestCollectionItemDate", (items = []) => {
    if (!items.length) return new Date(0);
    return items.reduce((a, b) => (a.date > b.date ? a : b)).date;
  });

  /* ----------------------------
   * Eleventy directories & engines
   * ---------------------------- */
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "public"          // change to "_site" if you prefer the default
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };
};
