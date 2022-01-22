const gulp = require("gulp"),
  imageMinify = require("./imageMinify"),
  svgSprite = require("./spriteSVG"),
  pngSprite = require("./spritePNG"),
  styles = require("./styles"),
  headerStyles = require("./headerStyles"),
  pug2html = require("./pug"),
  script = require("./scripts"),
  vendorsJS = require("./vendorsJS"),
  server = require("browser-sync").create();

// Запуск сервера а также слежка за файлами

module.exports = function serve(cb) {
  server.init({
    server: "docs",
    notify: false,
    open: true,
    cors: true,
  });

  gulp
    .watch(
      "dev/static/images/**/*.{gif,png,jpg,svg,webp}",
      gulp.series(imageMinify)
    )
    .on("change", server.reload);
  gulp
    .watch("dev/static/images/sprite/svg/*.svg", gulp.series(svgSprite))
    .on("change", server.reload);
  gulp
    .watch("dev/static/images/sprite/png/*.png", gulp.series(pngSprite))
    .on("change", server.reload);
  gulp
    .watch(
      "dev/static/styles/**/*.scss",
      gulp.series(styles, headerStyles, pug2html)
    )
    .on("change", server.reload);
  gulp
    .watch("dev/static/js/**/*.js", gulp.series(script, vendorsJS))
    .on("change", server.reload);
  gulp.watch("dev/pug/**/*.pug", gulp.series(pug2html));
  gulp.watch("docs/*.html").on("change", server.reload);

  return cb();
};
