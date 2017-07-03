const autoprefixer = require('autoprefixer')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const cssnano = require('gulp-cssnano')
const data = require('gulp-data')
const gulp = require('gulp')
const jsmin = require('gulp-jsmin')
const mergeJson = require('merge-json')
const postcss = require('gulp-postcss')
const postImport = require('postcss-import')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const sourceMaps = require('gulp-sourcemaps')

gulp.task('pug', () => {
	return gulp.src('src/index.pug')
		.pipe(data(() => {
			let result = mergeJson.merge(require('./src/data/projects.json'),
				require('./src/data/about.json'))
			result = mergeJson.merge(result, require('./src/data/skills.json'))

			return result
		}))
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

gulp.task('js', () => {
	return gulp.src(['./src/js/vendor/smooths-scroll.min.js', './src/js/index.js'])
		.pipe(sourceMaps.init())
		.pipe(babel())
		.pipe(concat('index.min.js'))
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./dist/'))
})

gulp.task('watch', () => {
	gulp.watch('src/**/*.pug', ['pug'])
	gulp.watch('src/**/*.css', ['css'])
	gulp.watch('src/**/*.js', ['js'])
})
