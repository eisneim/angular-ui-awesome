var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');


// js file 
var concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

// angularjs
var templateCache = require('gulp-angular-templatecache');
var htmlify = require('gulp-angular-htmlify');
var minifyHtml = require("gulp-minify-html");
var gettext = require('gulp-angular-gettext');
var ngAnnotate = require('gulp-ng-annotate');

// less->css
var sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');

// html
var minifyHtml = require('gulp-minify-html');


var paths = {
  js:   './src/**/*.js',
  sass: './src/**/*.scss',
  html: './src/**/*.html',
  plugins:[],
};

// ---------------------------------------------------- sass
gulp.task('sass-doc', function() {
  // console.log('-----build main.scss');
  gulp.src('./doc/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./doc/css/'))
    .pipe(livereload());
});
gulp.task('sass-build', function() {
  gulp.src('./src/_scss/angular-ui-awesome.scss')
    .pipe(sass())
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/'))
});

gulp.task('sass-watch',function() {
  watch({glob: paths.sass}, ['sass-doc'] )
});

// ---------------------------------------------------- js
gulp.task('js-build', function() {
  gulp.src(paths.js)
    .pipe(ngAnnotate() )
    .pipe(concat('angular-ui-awesome.js'))
    .pipe( uglify({
          compress:true,
          mangle:false,
        }) ) 
    .pipe(gulp.dest('./build/'))
});

gulp.task('js-doc', function() {
  gulp.src(paths.js)
    .pipe(concat('angular-ui-awesome.js'))
    .pipe(gulp.dest('./doc/app/'))
});

// gulp.task('join-modules', function() {
//   gulp.src(paths.plugins)
//     .pipe(concat('modules.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('./public/build/'))
// });

//  ============ template cache =====>>>>>>>>>>>>>>>>>>>>>>>
gulp.task('tplCache', function () {
    gulp.src(paths.html)
        .pipe( htmlify() )
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(templateCache({
          standalone:true,
          module:'ngUiAwesomeTemp',
          root:'build/'
        }) )
        .pipe(gulp.dest('./build/'));
});

// gulp.task('html', function() {
//   gulp.src(paths.html)
//     .pipe( htmlify() )
//     .pipe(minifyHtml())
//     .pipe(gulp.dest('./public/build/html/'));
// });


// --------------------------------------------------------------watch
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch([paths.html,'./doc/app/**/*.html']).on('change', livereload.changed);
    gulp.watch(paths.js,['js-doc'])
    gulp.watch(paths.js ).on('change', livereload.changed);

    gulp.watch('./doc/app/**/*.js').on('change', livereload.changed);
    gulp.watch('./doc/scss/**/*.scss', ['sass-doc']);
    gulp.watch(paths.sass, ['sass-doc']);
});

// ---------------------------------------- production -------------
gulp.task('default', ['watch']);

gulp.task('build', ['tplCache','sass-build','js-build']); // 'join-modules',



