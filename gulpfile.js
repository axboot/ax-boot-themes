'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var fs = require('fs');

var CONFIG = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var THEMES = [
    "arongi",
    "bulldog",
    "cocker",
    "doberman"
];

var ROOT = CONFIG.root;
var AX5UI_PLUGINS = {
    "ax5core": "ax5core",
    "ax5ui-dialog": "ax5dialog",
    "ax5ui-mask": "ax5mask",
    "ax5ui-toast": "ax5toast",
    "ax5ui-modal": "ax5modal",
    "ax5ui-calendar": "ax5calendar",
    "ax5ui-picker": "ax5picker",
    "ax5ui-formatter": "ax5formatter",
    "ax5ui-menu": "ax5menu",
    "ax5ui-select": "ax5select",
    "ax5ui-grid": "ax5grid",
    "ax5ui-combobox": "ax5combobox",
    "ax5ui-layout": "ax5layout",
    "ax5ui-binder": "ax5binder",
    "ax5ui-autocomplete": "ax5autocomplete"
};
var ASSETS = ROOT + "";
var AX5UI_PATH = CONFIG.ax5uiPath;

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

gulp.task('scss-ie9', function () {

    for (var i = 0, l = THEMES.length; i < l; i++) {
        gulp.src([
            THEMES[i] + '/axboot-01.scss',
            THEMES[i] + '/axboot-02.scss',
            THEMES[i] + '/axboot-03.scss'
        ])
            .pipe(plumber({errorHandler: errorAlert}))
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(gulp.dest(THEMES[i] + '/'));
    }

});

gulp.task('import-ax5ui-file', function () {
    /*
     ax5ui 소스를 로컬에서 직접 복붙하는 타스크
     */
    for (var k in AX5UI_PLUGINS) {
        gulp.src([
            '!' + AX5UI_PATH + k + '/**/test/**/*',
            '!' + AX5UI_PATH + k + '/**/node_modules/**/*',
            AX5UI_PATH + k + '/**/src/**/*',
            AX5UI_PATH + k + '/**/dist/**/*',
            AX5UI_PATH + k + '/**/*.json'
        ], {base: AX5UI_PATH})
            .pipe(gulp.dest('plugins'));
    }

});


/**
 * watch
 */
gulp.task('default', function () {
    // SASS
    gulp.watch('**/*.scss', ['scss']);
});