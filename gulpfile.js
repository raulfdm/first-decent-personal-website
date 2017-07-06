const autoprefixer = require('autoprefixer')
const babel = require('gulp-babel')
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const cssnano = require('gulp-cssnano')
const data = require('gulp-data')
const ghPages = require('gulp-gh-pages')
const gulp = require('gulp')
const hash = require('gulp-rev')
const imagemin = require('gulp-imagemin')
const jsmin = require('gulp-jsmin')
const mergeJson = require('merge-json')
const postcss = require('gulp-postcss')
const postImport = require('postcss-import')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const sequence = require('gulp-sequence')

const DEST_FOLDER = 'dist/'
const MANIFEST_CONFIG = {
	merge: true,
}

gulp.task('build', ['clean'], callback =>
	sequence(['css', 'js', 'image'], ['copy-files', 'pug'])(callback))

gulp.task('clean', () => {
	return gulp.src(DEST_FOLDER)
		.pipe(clean())
})

gulp.task('copy-files', () => {
	return gulp.src('src/CNAME')
		.pipe(gulp.dest(DEST_FOLDER))
})

gulp.task('css', () => {
	gulp.src('src/css/index.css')
		.pipe(postcss([autoprefixer(), postImport()]))
		.pipe(cssnano())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(hash())
		.pipe(gulp.dest(DEST_FOLDER))
		.pipe(hash.manifest(MANIFEST_CONFIG))
		.pipe(gulp.dest(DEST_FOLDER))
})

gulp.task('deploy', sequence('build', 'pages'))

gulp.task('image', () => {
	const CONFIG = {
		progressive: true
	}

	return gulp.src('src/img/**/*')
		.pipe(imagemin([
			imagemin.jpegtran({
				progressive: true
			}),
			imagemin.optipng({
				optimizationLevel: 5
			})
		]))
		.pipe(gulp.dest(DEST_FOLDER + 'img/'))
})

gulp.task('js', () => {

	return gulp.src(['./src/js/vendor/smooths-scroll.min.js',
			'./src/js/index.js'
		])
		.pipe(babel())
		.pipe(jsmin())
		.pipe(concat('index.min.js'))
		.pipe(hash())
		.pipe(gulp.dest(DEST_FOLDER))
		.pipe(hash.manifest(MANIFEST_CONFIG))
		.pipe(gulp.dest(DEST_FOLDER))
})

gulp.task('pages', () => {
	return gulp.src(DEST_FOLDER + '**/*')
		.pipe(ghPages())
})

gulp.task('pug', () => {
	return gulp.src('src/index.pug')
		.pipe(data(() => {
			let result = mergeJson.merge(require('./src/data/projects.json'),
				require('./src/data/about.json'))
			result = mergeJson.merge(result, require('./src/data/skills.json'))
			result.assets = require('./dist/rev-manifest.json')
			return result
		}))
		.pipe(pug({}))
		.pipe(gulp.dest(DEST_FOLDER))
})

gulp.task('watch', () => {
	gulp.watch('src/**/*.pug', ['pug'])
	gulp.watch('src/**/*.css', ['css'])
	gulp.watch('src/**/*.js', ['js'])
})
