const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browser = require('browser-sync');

gulp.task('sass', function () {

    //Index.html
    return gulp.src('src/sass/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('server', function () {

    browser.init({
        server: {
            baseDir: 'src/'
        }
    });

    //Change Listeners
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/**/*.*').on('change', browser.reload);
})