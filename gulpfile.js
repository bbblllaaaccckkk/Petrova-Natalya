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



