module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/css/");

  return {
    pathPrefix: '11ty-data',
    dir: {
      input: "src",
      output: "public",
      includes: '_includes',
      layouts: '_includes'
    },
  };
};
