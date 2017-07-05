const autoprefixer = require('autoprefixer')
const babel = require('gulp-babel')
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const cssnano = require('gulp-cssnano')
const data = require('gulp-data')
const ghPages = require('gulp-gh-pages')
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const jsmin = require('gulp-jsmin')
const mergeJson = require('merge-json')
const postcss = require('gulp-postcss')
const postImport = require('postcss-import')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const sequence = require('gulp-sequence')
const sourceMaps = require('gulp-sourcemaps')

gulp.task('build', callback =>
	sequence('clean', ['css', 'js', 'pug', 'image', 'copy-files'])(callback))

gulp.task('clean', () => {
	return gulp.src('dist/')
		.pipe(clean())
})

gulp.task('copy-files', () => {
	return gulp.src('src/CNAME')
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

gulp.task('deploy', sequence('build', 'pages'))

gulp.task('image', () => {
	return gulp.src('./src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img/'))
})

gulp.task('js', () => {
	return gulp.src(['./src/js/vendor/smooths-scroll.min.js',
			'./src/js/index.js'
		])
		.pipe(sourceMaps.init())
		.pipe(babel())
		.pipe(concat('index.min.js'))
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./dist/'))
})

gulp.task('pages', () => {
	return gulp.src('dist/**/*')
		.pipe(ghPages())
})

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

gulp.task('watch', () => {
	gulp.watch('src/**/*.pug', ['pug'])
	gulp.watch('src/**/*.css', ['css'])
	gulp.watch('src/**/*.js', ['js'])
})
