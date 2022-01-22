const gulp = require("gulp");
const uglify = require("gulp-uglify");
const argv = require("yargs").argv;
const gulpif = require("gulp-if");
const concat = require("gulp-concat");

// Работа со скриптами

const scripts = ["dev/static/js/main.js"];

module.exports = function script() {
  return gulp
    .src(scripts)
    .pipe(concat("main.js"))
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(gulp.dest("docs/static/js/"));
};
