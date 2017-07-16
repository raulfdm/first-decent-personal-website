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
const revision = require('gulp-rev')
const revisionDelete = require('gulp-rev-delete-original');
const sequence = require('gulp-sequence')

const DEST_FOLDER = 'dist/'
const MANIFEST_CONFIG = {
	merge: true,
	manifestName: 'rev-manifest.json',
	manifestPath: 'src/data/'
}

gulp.task('build', ['clean'], callback =>
	sequence(['css', 'js', 'image'], ['copy-files','revision'], 'pug')(callback)
)

gulp.task('clean', () => {
	return gulp.src(DEST_FOLDER)
		.pipe(clean())
})

gulp.task('copy-files', () => {
	return gulp.src('src/CNAME')
		.pipe(gulp.dest(DEST_FOLDER))
})

gulp.task('css', () => {
	return gulp.src('src/css/index.css')
		.pipe(postcss([autoprefixer(), postImport()]))
		.pipe(cssnano())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(DEST_FOLDER))
})

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
		.pipe(gulp.dest(DEST_FOLDER))
})

gulp.task('pages', () => {
	return gulp.src(DEST_FOLDER + '**/*')
		.pipe(ghPages())
})

gulp.task('pug', () => {
	return gulp.src('src/index.pug')
		.pipe(data(() => {

			const result = {
				projects: require('./src/data/projects.json'),
				about: require('./src/data/about.json'),
				abilities: require('./src/data/skills.json')
			}

			try {
				result.assets = require('./src/data/rev-manifest.json')
			} finally {
				return result
			}

		}))
		.pipe(pug({}))
		.pipe(gulp.dest(DEST_FOLDER))
})

gulp.task('revision', () => {
	return gulp.src('dist/**/*.+(css|js)')
		.pipe(revision())
		.pipe(gulp.dest('dist/'))
		.pipe(revisionDelete())
		.pipe(revision.manifest(MANIFEST_CONFIG))
		.pipe(gulp.dest(MANIFEST_CONFIG.manifestPath))
})

gulp.task('watch', () => {
	gulp.watch('src/**/*.pug', ['pug'])
	gulp.watch('src/**/*.css', ['css', 'pug'])
	gulp.watch('src/**/*.js', ['js', 'pug'])
})
