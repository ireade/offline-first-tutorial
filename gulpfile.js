const gulp = require('gulp');
const gutil = require('gulp-util');


/* *************
 CSS
 ************* */

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const scss = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

const sassMainFile = ['src/scss/global.scss', 'src/scss/offline.scss'];
const sassFiles = 'src/scss/**/*.scss';

gulp.task('css', function () {
	gulp.src(sassMainFile)
		.pipe(postcss([autoprefixer()], { syntax: scss }))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', gutil.log))
		.pipe(cleanCSS())
		.pipe(gulp.dest('assets/built'));
});



/* *************
 JS
 ************* */

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const jsFiles = 'src/**/*.js';

gulp.task('js', function () {
	gulp.src('src/js/post/*.js')
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(concat('post.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/built'));

	gulp.src('src/js/global/*.js')
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(concat('global.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/built'));

	gulp.src('src/js/*.js')
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())
		.pipe(gulp.dest('assets/built'));

	gulp.src('src/sw.js')
		.pipe(gulp.dest(''));
});

gulp.task('watch', function () {
	gulp.watch(sassFiles, ['css']);
	gulp.watch(jsFiles, ['js']);
});

gulp.task('default', ['css', 'js', 'watch']);