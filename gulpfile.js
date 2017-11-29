
var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var cheerio = require('gulp-cheerio');
var changed = require('gulp-changed');
var svgo = require('gulp-svgo');


var paths = {
    srcIcons: 'icons/svg/*.svg',
    tempIcons: 'icons/temp', // so we never overwrite original files
    srcIconsTemp: 'icons/temp/*.svg',
    destSnippets: 'icons/sprite',
    dist: 'dist/'
};

gulp.task('icon-class', () => {
    return gulp
        .src(paths.srcIcons)
        .pipe(changed(paths.tempIcons))
        .pipe(cheerio({
            run: function ($, file) {
                var $svg = $('svg');
                if (file.relative.indexOf('-full-color') >= 0) {
                    $svg.addClass('icon icon--full-color')
                }
                $svg.addClass('icon');
            }
        }))
        .pipe(gulp.dest(paths.tempIcons));
});

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

gulp.task('svgicons', ['optimize'], () => {
    gulp.src(paths.srcIconsTemp)
        .pipe(svgSprite({
            svg: {
                namespaceClassnames: false,
            },
            mode: {
                symbol: {
                    dest: '.',
                    sprite: 'svg/icons.svg',
                    example: {
                        template: 'icons/template/sprite.html'
                    }
                }
            }
        }))
        .on('error', (error) => {
            console.log(error);
        })
        .pipe(gulp.dest(paths.destSnippets));
});