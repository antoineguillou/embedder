/**
 * include plug-ins
 */
var gulp = require('gulp');
var changed = require('gulp-changed');
var concat = require('gulp-concat-multi');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');

/**
 * Path
 */
var src_theme = './src/';
var src_sass = './src/scss/';
var dist_theme = './dist/';
var src_js = src_theme + 'js/';
var path = {
  src: {
    scripts: [{
      path: src_js,
      files: {
        'script.js': [
            src_js + 'embedder.js',
        ]
      }
    }, ],
    scss: src_sass + '**/*.scss',
  },
  dist: {
    scripts: [
      dist_theme + 'js/',
    ],
    scss: dist_theme + 'css/',
  }
}

/**
* TASKS
*/

// JS concat, strip debugging and minify
gulp.task('scripts', function () {
  var options = {
      "mangle": false
  };
  for (var i in path.src.scripts) {
    for (var j in path.src.scripts[i]['files']) {
        base = path.src.scripts[i]['path'];
        gulp.src(path.src.scripts[i]['files'][j], {
            base: path.src.scripts[i]['path']
          })
          .pipe(stripDebug())
          .pipe(uglify(options))
          .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
          })
          .pipe(rename(function (path) {
            path.basename += ".min";
          }))
          .pipe(gulp.dest(path.dist.scripts[i]));
    }
  }
  for (var i in path.src.scripts) {
    for (var j in path.src.scripts[i]['files']) {
      base = path.src.scripts[i]['path'];
      gulp.src(path.src.scripts[i]['files'][j], {
          base: path.src.scripts[i]['path']
        })
        .pipe(gulp.dest(path.dist.scripts[i]));
    }
  }
});

gulp.task('styles', function () {
  var sassArgs = {
    outputStyle: 'compressed'
  }
  gulp.src(path.src.scss)
    .pipe(sass(sassArgs).on('error', notify.onError({
      message: "Error: <%= error.message %>",
      title: "Error running something"
    })))
    .pipe(autoprefixer({
      browsers: ['Firefox >= 48', 'IE >= 11', 'Chrome >= 50']
    }))
    .pipe(cleanCSS())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest(path.dist.scss))

  var sassArgs = {
    outputStyle: 'nested'
  }
  gulp.src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass(sassArgs).on('error', notify.onError({
      message: "Error: <%= error.message %>",
      title: "Error running something"
    })))
    .pipe(autoprefixer({
      browsers: ['Firefox >= 48', 'IE >= 11', 'Chrome >= 50']
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.scss));

});

// Clean du dist
gulp.task('clean_all', function () {
  return del([dist_theme + '**/*'])
});
gulp.task('reset', ['clean_all'], function () {
  gulp.start('default');
});
gulp.task('clean', function () {
  return del([dist_theme + '**/*.js', dist_theme + '**/*.css', dist_theme + '**/*.css.map']);
});

// default gulp task
gulp.task('default', ['clean'], function () {
  gulp.start('scripts');
  gulp.start('styles');

  // watch for SCSS changes
  watch(path.src.scss, function () {
    gulp.start('styles');
  });

  // watch for scripts changes
  for (var i in path.src.scripts) {
    for (var j in path.src.scripts[i]['files']) {
      watch(path.src.scripts[i]['files'][j], function () {
        gulp.start('scripts');
      });
    }
  }
});
