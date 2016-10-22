'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");

var THEMES = [
    "arongi",
    "bulldog",
    "cocker",
    "doberman"
];

function errorAlert(error) {
    notify.onError({title: "Gulp Error", message: "Check your terminal", sound: "Purr"})(error); //Error Notification
    console.log(error.toString());//Prints Error to Console
    this.emit("end"); //End function
}

/**
 * SASS
 */
gulp.task('scss', function () {

    for (var i = 0, l = THEMES.length; i < l; i++) {
        gulp.src(THEMES[i] + '/axboot.scss')
            .pipe(plumber({errorHandler: errorAlert}))
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(gulp.dest(THEMES[i] + '/'));
    }

});

/**
 * watch
 */
gulp.task('default', function () {
    // SASS
    gulp.watch('**/*.scss', ['scss']);
});