
var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var lint = require('gulp-jshint');

/*--package properties--*/
var pkg = require('./package.json');

/*--output folder--*/
var dest = 'dist';
var filename = 'logbone.js';

/*--main script--*/
var logboneJs = 'js/Logbone.js';

/*--lint--*/
gulp.task('lint', [], function(){
	var stream = 
		gulp.src(logboneJs)
		.pipe(lint())
		.pipe(lint.reporter('default'));
	;
});

gulp.task('build', ['lint'], function(){
	var stream = gulp.src([
			logboneJs
		])
		.pipe(concat(filename))
		.pipe(minify())
		.pipe(gulp.dest('dist/'));		
});

gulp.task('default', [
	'build'
]);