const gulp = require("gulp");
const concat = require("gulp-concat");

const vendorsScripts = [
  // "node_modules/jquery/dist/jquery.min.js",
  // "node_modules/svg4everybody/dist/svg4everybody.min.js",
  // "node_modules/nouislider/distribute/nouislider.min.js",
  "node_modules/swiper/swiper-bundle.min.js",
  // "node_modules/fslightbox/index.js",
  "node_modules/inputmask/dist/inputmask.min.js",
  "node_modules/just-validate/dist/js/just-validate.min.js",
  "node_modules/smooth-scrollbar/dist/smooth-scrollbar.js",
  // "node_modules/custom-select/build/custom-select.min.js",
  // "dev/static/js/modules/select.js",
  // "dev/static/js/modules/dynamicAdapt.js",
];

module.exports = function vendors(cb) {
  return vendorsScripts.length
    ? gulp
        .src(vendorsScripts)
        .pipe(concat("libs.js"))
        .pipe(gulp.dest("docs/static/js/"))
    : cb();
};
