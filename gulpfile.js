/* Const vars = requires */
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');

/* IMAGEMIN */
gulp.task('imagemin', () =>
gulp.src('src/images/*')
.pipe(imagemin())
.pipe(gulp.dest('dist/images'))
);


/* COPY PHP */
gulp.task('copyphp', function()
{
    gulp.src('src/*.php')
    .pipe(gulp.dest('dist'));
});

/* SASS */
gulp.task('sass', function()
{
    return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('stylesheet.css'))
    .pipe(gulp.dest('src/css'));
});

/* CSS */
gulp.task('css', function(){
    return gulp.src('src/css/*.css')
    .pipe(concat('style.css'))
    .pipe(uglifycss(
        {
        "maxLineLen": 80,
        "uglyComments": true
        }))
    .pipe(gulp.dest('dist/css'));
});

/* SCRIPTS */
gulp.task('scripts', function()
{
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('run', ['sass', 'css', 'copyphp', 'imagemin', 'scripts']);

gulp.task('watch', function()
{
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imagemin']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/*.php', ['copyphp']);
});

gulp.task('default', ['run', 'watch']);