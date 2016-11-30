const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browser = require('browser-sync'),
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin'),            
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    ghPages = require('gulp-gh-pages'),
    clean = require('gulp-clean');


gulp.task('build', ['clean'], function() {
    gulp.start('sass', 'usemin', 'copyFiles', 'imagemin');
})

gulp.task('imagemin', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function() {
    return gulp.src('src/**/*.html')
        .pipe(usemin({
            // 'js': [uglify],
            'css': [autoprefixer, cssmin]
        }))
        .pipe(gulp.dest('dist/'))
});

gulp.task('clean', function() {
    return gulp.src('dist/')
        .pipe(clean());
});

//Copia os outros arquivos arquivos
gulp.task('copyFiles', function() {
    gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('sass', function() {

    //Index.html
    return gulp.src('src/sass/index.scss')
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