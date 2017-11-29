
var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var svgo = require('gulp-svgo');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

var paths = {
    srcIcons: 'icons/svg/*.svg',
    tempIcons: 'icons/temp',
    srcIconsTemp: 'icons/temp/*.svg',
    destSnippets: 'icons/sprite',
    srcPlugin: 'iconPickerPlugin/ttIcons.js',
    srcMinPlugin: 'iconPickerPlugin/ttIcons.min.js',
    destPlugin: 'iconPickerPlugin/',
    pluginExample: 'iconPickerPlugin/example/app/scripts/'
};


gulp.task('optimize', () => {

    return gulp.src(paths.srcIcons)
        .pipe(svgo({
            plugins: [
                { removeDesc: { removeAny: true } },
                { removeTitle: {} },
                { cleanupAttrs: {} },
                { collapseGroups: {} },

            ]
        }))
        .pipe(gulp.dest(paths.tempIcons));
});

gulp.task('svgicons', () => {
    gulp.src(paths.srcIconsTemp)
        .pipe(svgSprite({
            svg: {
                namespaceClassnames: false,
            },
            mode: {
                symbol: {
                    dest: '../../',
                    sprite: './icons/sprite/icons.svg',
                    example: {
                        template: 'icons/template/ttIcons.js',
                        dest: './iconPickerPlugin/ttIcons.js'
                    }
                }
            }
        }))
        .on('error', (error) => {
            console.log(error);
        })
        .pipe(gulp.dest(paths.destSnippets));
});

gulp.task('jsmin', () => {
    gulp.src(paths.srcPlugin)
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.destPlugin));
});

gulp.task('example', function () {

    gulp.src(paths.srcMinPlugin)
        .pipe(gulp.dest(paths.pluginExample));
});

gulp.task('default', function () {
    runSequence('optimize',
        'svgicons',
        'jsmin',
        'example');
});


