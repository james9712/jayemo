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

  const fs = require("fs");
  const path = require("path");

eleventyConfig.addCollection("media", () => {
  const root = "src/assets/media";
  const exts = new Set([".png",".jpg",".jpeg",".gif",".webp",".svg"]);
  const out = [];

  function walk(dir){
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p);
      else if (exts.has(path.extname(name).toLowerCase())) {
        // turn "src/assets/media/monkey.png" -> "/assets/media/monkey.png"
        out.push("/" + path.relative("src", p).replace(/\\/g, "/"));
      }
    }
  }
  walk(root);
  return out;
});

const htmlmin = require("html-minifier-terser");
	
// in module.exports:
eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
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
