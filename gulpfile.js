/* jshint node: true */
'use strict';

var gulp = require('gulp'),
	version = require('./package.json').version;

function buildRelease() {
	console.log('Building version ' + version);
	var uglify = require('gulp-uglify'),
		sourcemaps = require('gulp-sourcemaps'),
		multipipe = require('multipipe');

	multipipe(
		gulp.src('src/EventEmitter.js'),
		sourcemaps.init(),
		uglify(),
		sourcemaps.write('.'),
		gulp.dest('dist'),
		onError
	);
}

function runTests(done) {
	var karma = require('karma').server;
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);
}

function tdd(done) {
	var karma = require('karma').server;
	karma.start({
		configFile: __dirname + '/karma.conf.js'
	}, done);
}

function onError(err) {
	if (err) {
		console.warn(err.message || err);
		if (err.stack) console.log(err.stack);
	}
}

gulp.task('build', ['test'], buildRelease);
gulp.task('tdd', tdd);
gulp.task('test', runTests);
gulp.task('default', ['tdd']);
