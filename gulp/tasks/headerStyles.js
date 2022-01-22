const gulp = require("gulp");
const plumber = require("gulp-plumber");
const scss = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const argv = require("yargs").argv;
const gulpif = require("gulp-if");

// Работаем со стилями

module.exports = function headerStyles() {
  return gulp
    .src("dev/static/styles/modules/header/header.scss")
    .pipe(plumber())
    .pipe(scss())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 4 version"],
        cascade: false,
      })
    )
    .pipe(
      cleanCSS(
        {
          debug: true,
          compatibility: "*",
        },
        (details) => {
          console.log(
            `${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`
          );
        }
      )
    )
    .pipe(gulp.dest("dev/static/styles"));
};
