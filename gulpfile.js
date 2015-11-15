'use strict'
const gulp = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')

gulp.task('js', () => {
	return gulp.src('client/js/main.js')
		.pipe(webpack({
			module: {
				loaders: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: 'babel?presets[]=es2015',
					},
					{
						test: /\.vue$/,
						loader: 'vue',
					},
				],
			},
			output: {
				filename: 'app.js',
			},
		}))
		.pipe(gulp.dest('public/js/'))
})

gulp.task('sass', () => {
	return gulp.src('client/sass/main.sass')
		.pipe(sass.sync({
			includePaths: [
				'node_modules/sanitize.css',
			],
			indentedSyntax: true,
			outputStyle: 'compressed',
		}).on('error', sass.logError))
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('public/css/'))
})

gulp.task('watch:js', () => {
	gulp.watch('client/js/**/*.*', ['js'])
})

gulp.task('watch:sass', () => {
	gulp.watch('client/sass/**/*.*', ['sass'])
})

gulp.task('compile', ['sass', 'js'])
gulp.task('watch', ['compile', 'watch:sass', 'watch:js'])
gulp.task('default', ['compile'])
