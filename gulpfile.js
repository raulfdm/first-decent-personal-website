const autoprefixer = require('autoprefixer')
const cssnano = require('gulp-cssnano')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const postImport = require('postcss-import')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const sourceMaps = require('gulp-sourcemaps')

gulp.task('pug', () => {
	return gulp.src('src/index.pug')
		.pipe(pug({}))
		.pipe(gulp.dest('dist/'))
})

gulp.task('css', () => {
	gulp.src('src/css/index.css')
		.pipe(sourceMaps.init())
		.pipe(postcss([autoprefixer(), postImport()]))
		.pipe(cssnano())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest('dist/'))
})

gulp.task('watch', () => {
	gulp.watch('src/**/*.pug', ['pug'])
	gulp.watch('src/**/*.css', ['css'])
})
