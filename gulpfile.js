var gulp = require("gulp");
var concat = require("gulp-concat");


gulp.task("default", ["watch"]);

gulp.task("watch", function () {
    gulp.watch('./src/**/*.js', ["build"]);
});

gulp.task("build", function () {
    return gulp.src(
        [
            "./src/core/utils.js",
            "./src/core/input.js",
            "./src/core/stellajs.js"
        ])
        .pipe(concat("stellajs.js"))
        .pipe(gulp.dest('./build/'));
});