const gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    browser = require('browser-sync'),
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    ghPages = require('gulp-gh-pages'),
    clean = require('gulp-clean');


gulp.task('build', ['clean'], function() {
    gulp.start('sass', 'imagemin', 'usemin','copyFiles');
})

gulp.task('imagemin', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function() {
    return gulp.src('src/**/*.html')
        .pipe(usemin({
            'html': [htmlmin({
                collapseWhitespace: true,
                removeComments: true
            })],
            'js': [babel({
                    presets: ['es2015']
                })/*,
                uglify*/
            ],
            'jsAttributes': {
                async: false
            },
            'css': [autoprefixer, cssmin]
        }))
        .pipe(gulp.dest('dist/'))
});

gulp.task('copyFiles', function() {
    gulp.src('src/scripts/libs/**/*')
        .pipe(gulp.dest('dist/scripts/libs/'));
});

gulp.task('clean', function() {
    return gulp.src('dist/')
        .pipe(clean());
});

gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('server', function() {

    browser.init({
        server: {
            baseDir: 'src/'
        }
    });

    //Change Listeners
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/**/*.*').on('change', browser.reload);
});

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('server-dist', function() {

    browser.init({
        server: {
            baseDir: 'dist/'
        }
    });

    //Change Listeners
    gulp.watch('dist/sass/**/*.scss', ['sass']);
    gulp.watch('dist/**/*.*').on('change', browser.reload);
});