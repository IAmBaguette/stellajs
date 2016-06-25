var gulp = require("gulp");
var header = require('gulp-header');
var concat = require("gulp-concat");
var strip = require('gulp-strip-comments');
var stripDebug = require("gulp-strip-debug");


gulp.task("default", ["build", "watch"]);

gulp.task("watch", function () {
    gulp.watch("./src/**/*.js", ["build"]);
});

gulp.task("build", function () {
    gulp.src(
        [
            "./src/core/vector.js",
            "./src/core/utils.js",
            "./src/core/grid.js",
            "./src/core/camera.js",
            "./src/core/keycode.js",
            "./src/core/input.js",
            "./src/core/loader.js",
            "./src/core/anim.js",
            "./src/core/animates.js",
            "./src/core/state.js",
            "./src/core/stellajs.js"
        ])
        .pipe(concat("stellajs.js"))
        //.pipe(stripDebug())
        .pipe(strip())
        //.pipe(header("//TEST\n"))
        .pipe(gulp.dest('./build/'));
});