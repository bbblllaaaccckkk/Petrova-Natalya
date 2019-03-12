const gulp = require('gulp'); 
const sass = require('gulp-sass');  
const sourcemaps = require('gulp-sourcemaps'); // возьмем для генерации css sourscemaps, которые будут помогать нам при отладке кода
const rigger = require('gulp-rigger'); //Плагин позволяет импортировать один файл в другой простой конструкцией   //= footer.html
const runSequence = require('run-sequence'); // поочередно запускает задачи
const watch = require('gulp-watch'); //наблюдения за изменениями файлов.
const browserSync = require('browser-sync'); //Перезагрузка браузера
const reload = browserSync.reload;
const clean = require('gulp-clean'); //очищает сборку
const imagemin = require('gulp-imagemin'); //сжимает картинки

gulp.task('html', function () {
    gulp.src('app/*html')
    .pipe(rigger())
    .pipe(gulp.dest('build/'))
    .pipe(reload({stream: true}));
});

gulp.task('sass', function () {
    return gulp.src('.app/style/css.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.app/styles/'))
    .pipe(reload({stream: true}));
});

gulp.task('images', function(){
    return gulp.src("./app/images/**/*")
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ], {
        verbose: true
    }))
    .pipe(gulp.dest('build/images/'))
    .pipe(reload({stream: true}));
});

gulp.task('bootstrap', function() {
    return gulp.src('./app/bootstrap/**/*')
    .pipe(gulp.dest('build/bootstrap/'))
    .pipe(reload({stream: true}));
});

gulp.task('js', function() {
    return gulp.src('./app/js/**/*')
    .pipe(gulp.dest('build/js/'))
    .pipe(reload({stream: true}));
});

gulp.task('css', function(){
    return gulp.src('./app/styles/css.css')
    .pipe(gulp.dest('build/styles/'))
    .pipe(reload({stream: true}));
});

gulp.task('reload-css', function(){
    runSequence('sass', 'css');
});

gulp.task('browser-sync', function(){
    browserSync({
        startPath: '/',
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

gulp.task('watch', function(){
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/styles/*.scss', ['reload-css']);
    gulp.watch('app/js/*', ['js']);
    // gulp.watch('app/images/**/*', ['images']);
});

gulp.task('clean', function(){
    return gulp.src('build')
    .pipe(clean());
});

gulp.task('run', function(){
    runSequence('clean', 'images', 'html', 'js', 'bootstrap', 'reload-css', 'browser-sync', 'watch');
});

gulp.task('default', ['run']); 