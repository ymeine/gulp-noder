var nodePath = require('path');

var projectRoot = nodePath.join(__dirname, '..', '..');

// -----------------------------------------------------------------------------

var gulp = require('gulp');
var gulp_concat = require('gulp-concat');
var gulp_sourceMaps = require('gulp-sourcemaps');

var gulp_noder = require(nodePath.join(projectRoot, 'index.js'));



// -----------------------------------------------------------------------------

var testsContentPath = nodePath.join(projectRoot, 'tests', 'content');
var basePath = nodePath.join(testsContentPath, 'src');

var inputFiles = [basePath + '/**/*.js'];
var outputName = 'index.js';
var outputFolder = nodePath.join(testsContentPath, 'dist');
var mapsOutputFolder = nodePath.join(testsContentPath, 'maps');
mapsOutputFolder = outputFolder;
mapsOutputFolder = './';
// mapsOutputFolder = null;

// -----------------------------------------------------------------------------

gulp.task('default', function() {
	gulp.src(inputFiles, {base: basePath})
	.pipe(gulp_sourceMaps.init())
		// .pipe(gulp_noder.package(basePath))
		.pipe(gulp_concat(outputName))
		// .pipe(gulp_noder.wrap())
	.pipe(gulp_sourceMaps.write(mapsOutputFolder, {
		sourceRoot: 'src',
		sourceMappingURLPrefix: './'
	}))
	.pipe(gulp.dest(outputFolder))
});
