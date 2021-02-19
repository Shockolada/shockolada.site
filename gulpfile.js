'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minify = require('gulp-csso');
const fileinclude = require('gulp-file-include');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const server = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const svgssprite = require('gulp-svgstore');
const del = require('del');
const debug = require('gulp-debug');
const newer = require('gulp-newer');
const sourcemaps = require('gulp-sourcemaps');

const dist = './build/',
  src = './source/';

const cssParts = [
  // Пути к css которые будут собраны в главный файл стилей
  'node_modules/swiper/swiper-bundle.css',
  src + 'css/main/style.css', // Главный css файл из sass
];

const jsParts = [
  'node_modules/jquery/dist/jquery.min.js', // Пути к js которые будут собраны в главный файл стилей 
];


/* HTML */
gulp.task('html', () => {
  return gulp.src(src + '*.html')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(fileinclude())
    .pipe(gulp.dest(dist));
});


/* STYLES */
gulp.task('sass', () => {
  return gulp.src(src + 'sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
        outputStyle: 'expanded'
      })
      .on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(src + 'css/main'));
});

gulp.task('concat-css', () => {
  return gulp.src(
      cssParts
    )
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('style.css'))
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(gulp.dest(dist + 'css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist + 'css'))
    .pipe(server.stream());
});

// Single css files
gulp.task('css-single', () => {
  return gulp.src(src + 'css/independent/**/*.css')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(minify())
    .pipe(gulp.dest(dist + 'css'))
    .pipe(server.stream());
});

gulp.task('styles', gulp.parallel('css-single', gulp.series('sass', 'concat-css')));


/* JAVASCRIPT */
gulp.task('build-js', () => {
  return gulp.src(src + 'js/index.js')
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'bundle.js'
      },
      watch: false,
      devtool: 'source-map',
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: 'usage'
                }]
              ]
            }
          }
        }]
      }
    }))
    .pipe(gulp.dest(dist + 'js'));
  // .on('end', server.reload);
});

// concat scripts
gulp.task('concat-js', () => {
  return gulp.src(
      jsParts
    )
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist + 'js'));
});

gulp.task('scripts', gulp.series('build-js', 'concat-js'));


/* SERVER */
gulp.task('server', () => {
  server.init({
    server: dist,
    notify: true,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(src + '**/*.html', gulp.parallel('html')).on('change', server.reload);
  gulp.watch([src + 'js/**/*.js', '!' + src + 'js/bundle/**/*.*'], gulp.series('concat-js'));
  gulp.watch(src + 'js/**/*.js', gulp.series('build-js')).on('change', server.reload);
  gulp.watch(src + 'sass/**/*.{scss,sass}', gulp.parallel('sass'));
  gulp.watch([src + 'css/**/*.css', '!' + src + 'css/independent/**/*.*'], gulp.parallel('concat-css'));
  gulp.watch(src + 'css/independent/**/*.css', gulp.parallel('css-single'));
  gulp.watch([src + 'img/**/*.{png,jpg,svg}', '!' + src + 'img/svg/**/*.*'], gulp.parallel('imagesmin')).on('change', server.reload);
  gulp.watch(src + 'img/svg/**/*.svg', gulp.parallel('svgsprite'));
  gulp.watch(src + 'fonts/**/*.*', gulp.parallel('copy')).on('change', server.reload);
});


/* SVG SPRITES */
gulp.task('svgsprite', () => {
  return gulp.src(src + 'img/svg/**/*.svg')
    .pipe(svgssprite({
      inlineSvg: true
    }))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(dist + 'img'));
});


/* MINIFY IMAGES */
gulp.task('imagesmin', () => {
  return gulp.src([src + 'img/**/*.{png,jpg,svg}', '!' + src + 'img/svg/**/*.*'])
    .pipe(newer(dist + 'img')) // Пропускает только новые изображения, или если дата модификации более поздняя
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(debug({
      title: 'imagesmin'
    }))
    .pipe(gulp.dest(dist + 'img'));
});


/* IMAGES */
gulp.task('images', gulp.series('svgsprite', 'imagesmin', done => {
  done();
}));


/* COPY FILES FROM SRC */
gulp.task('copy', () => {
  return gulp.src([
      src + 'fonts/**/*.{woff,woff2,otf,ttf,eot}',
      src + 'favicons/**/*.*',
    ], {
      base: src
    }, {
      since: gulp.lastRun('copy')
    })
    .pipe(newer(dist)) // Сверяет файлы в исходной и конечной папке, 
    // пропуская если файла нет или дата модификации новее
    .pipe(debug({
      title: 'copy' // Показывает какие файлы скопированы
    }))
    .pipe(gulp.dest(dist));
});


/* On error message in plumber */
let onError = (err) => {
  notify.onError({
    title: err.plugin,
    message: err.message
  })(err);
  // this.emit('end');
};


/* REMOVE OLD dist AND DEVELOPMENT FILES */
gulp.task('clean', () => {
  return del([dist, src + 'js/bundle', src + 'css/main']);
});


/* TASKS */
gulp.task('build', gulp.parallel('copy', 'styles', 'html', 'scripts', 'images'));
gulp.task('default', gulp.series('build', 'server'));



/* PRODUCTION */

/* WATCH PRODUCTION */
gulp.task('serve-prod', () => {
  server.init({
    server: dist,
    notify: true,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(src + '**/*.html', gulp.parallel('html')).on('change', server.reload);
  gulp.watch([src + 'js/**/*.js', '!' + src + 'js/bundle/**/*.*'], gulp.series('concat-js-prod'));
  gulp.watch(src + 'js/bundle/**/*.js', gulp.series('build-js-prod')).on('change', server.reload);
  gulp.watch(src + 'sass/**/*.{scss,sass}', gulp.parallel('sass'));
  gulp.watch([src + 'css/**/*.css', '!' + src + 'css/independent/**/*.*'], gulp.parallel('concat-css-prod'));
  gulp.watch(src + 'css/independent/**/*.css', gulp.parallel('css-single'));
  gulp.watch([src + 'img/**/*.{png,jpg,svg}', '!' + src + 'img/svg/**/*.*'], gulp.parallel('imagesmin')).on('change', server.reload);
  gulp.watch(src + 'img/svg/**/*.svg', gulp.parallel('svgsprite'));
  gulp.watch(src + 'fonts/**/*.*', gulp.parallel('copy')).on('change', server.reload);
});


/* concat css prod */
gulp.task('concat-css-prod', () => {
  return gulp.src(
      cssParts
    )
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('style.css'))
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(gulp.dest(dist + 'css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(dist + 'css'))
    .pipe(server.stream());
});


/* JAVASCRIPT */
gulp.task('build-js-prod', () => {
  return gulp.src(src + 'js/index.js')
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'bundle.js'
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: 'usage'
                }]
              ]
            }
          }
        }]
      }
    }))
    .pipe(gulp.dest(dist + 'js'));
});

// concat scripts production
gulp.task('concat-js-prod', () => {
  return gulp.src(
      jsParts
    )
    .pipe(concat('main.js'))
    .pipe(gulp.dest(dist + 'js'));
});

gulp.task('scripts-prod', gulp.series('build-js-prod', 'concat-js-prod'));
gulp.task('styles-prod', gulp.parallel('css-single', gulp.series('sass', 'concat-css-prod')));

gulp.task('build-prod', gulp.parallel('copy', 'styles-prod', 'html', 'scripts-prod', 'images'));

gulp.task('production', gulp.series('clean', 'build-prod'));
gulp.task('watch-production', gulp.series('clean', 'build-prod', 'serve-prod'));
