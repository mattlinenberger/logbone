
var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

/*--package properties--*/
var pkg = require('./package.json');

/*--output folder--*/
var dest = 'dist';
var filename = 'logbone.js';

gulp.task('build', [], function(){
	var stream = gulp.src([
			'js/Logbone.js'
		])
		.pipe(concat(filename))
		.pipe(minify())
		.pipe(gulp.dest('dist/'));		
});

gulp.task('default', [
	'build'
]);