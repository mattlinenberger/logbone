
var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var lint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var logbone = require('./js/Logbone.js');

/*--package properties--*/
var pkg = require('./package.json');

/*--output folder--*/
var dest = 'dist';
var filename = 'logbone.js';

/*--main script--*/
var logboneJs = 'js/Logbone.js';

/*--tests--*/
gulp.task('test', [], function(){
	var stream = gulp.src([
		'test/spec/LogboneSpec.js'
	])
	.pipe(jasmine());

	return stream;
});

/*--lint--*/
gulp.task('lint', ['test'], function(){
	var stream = 
		gulp.src(logboneJs)
		.pipe(lint())
		.pipe(lint.reporter('default'));
	;
});

gulp.task('build', [], function(){
	var stream = gulp.src([
			logboneJs
		])
		.pipe(concat(filename))
		.pipe(minify())
		.pipe(gulp.dest('dist/'));		
});

gulp.task('build-and-test', ['lint'], function(){
	var stream = gulp.src([
			logboneJs
		])
		.pipe(concat(filename))
		.pipe(minify())
		.pipe(gulp.dest('dist/'));		
});

gulp.task('default', [
	'build-and-test'
]);