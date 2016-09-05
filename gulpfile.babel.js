import gulp from "gulp";
import uglify from "gulp-uglify";
import stylus from "gulp-stylus";
gulp.task("stylus", () => {
	return gulp.src("./dev_resource/stylus/*.styl").pipe(stylus({
		compress : 1
	})).pipe(gulp.dest("./resource/css"));
});
gulp.task("script", () => {
	return gulp.src("./dev_resource/js/*.js").pipe(uglify()).pipe(gulp.dest("./resource/js"));
});
gulp.task("stylus:build-dev", () => {
	return gulp.src("./dev_resource/stylus/*.styl").pipe(stylus()).pipe(gulp.dest("./resource/css"));
});
gulp.task("script:build-dev", () => {
	return gulp.src("./dev_resource/js/*.js").pipe(gulp.dest("./resource/js"));
});
gulp.task("build-dev", ["stylus:build-dev", "script:build-dev"], () => {
	gulp.watch(["./dev_resource/**/*"], ["stylus:build-dev", "script:build-dev"]);
});
gulp.task("default", ["stylus", "script"]);