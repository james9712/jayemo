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

  eleventyConfig.addPassthroughCopy('./src/style.css');
  eleventyConfig.addPassthroughCopy('./src/about.html')
  eleventyConfig.addPassthroughCopy('./src/blog.html')
  eleventyConfig.addPassthroughCopy('./src/not_found.html')
  eleventyConfig.addPassthroughCopy('./src/assets')
  eleventyConfig.addPassthroughCopy('./src/javascript/site.js')

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};