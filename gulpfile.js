const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const scss = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('css', function () {
	gulp.src(['src/scss/global.scss', 'src/scss/offline.scss'])
		.pipe(postcss([autoprefixer()], { syntax: scss }))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', gutil.log))
		.pipe(cleanCSS())
		.pipe(gulp.dest('assets/built'));
});

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
});

gulp.task('watch', function () {
	gulp.watch('src/scss/**/*.scss', ['css']);
	gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', ['css', 'js', 'watch']);
