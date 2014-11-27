/******************
 * Gulp Dependencies
 ******************/
var path = require('path'); // Path
var gulp = require('gulp'); // Gulp
var less = require('gulp-less'); // Less
var autoprefixer = require('gulp-autoprefixer'); // Scc Prefixer
var plumber = require('gulp-plumber'); // Like Compass
var uglify = require('gulp-uglify'); // Uglify Js File
var concat = require('gulp-concat'); // Concat Files
var templateCache = require('gulp-angular-templatecache'); // Angular Template Cache
var nodemon = require('gulp-nodemon'); // Run Node Server
var connect = require('gulp-connect'); // Live Reload & Watch index.html



/******************
 * Statics
 ******************/
var appName = 'mongoose-generic-api';

var versions = {
    app: 'v0.0.1',
    script: 'v0.0.1',
    style: 'v0.0.1'
};

var src = new function() {
    this.app = ['./app/'];
    this.server = './server.js';
    this.scripts = [this.app + 'scripts/*.js'];
    this.vendors = [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-route/angular-route.js',
        './bower_components/angular-resource/angular-resource.js'
    ];
    this.style = [this.app + 'styles/style.less'];
    this.styles = [this.app + 'styles/*.less'];
    this.templates = [this.app + 'templates/*.html'];
    this.dest = this.app + 'dist';
};



/******************
 * Scripts ( JS )
 ******************/
gulp.task('scripts', function() {
    gulp.src(src.scripts)
        .pipe(plumber())
        //.pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(src.dest))
        .pipe(connect.reload());
});



/******************
 * Concat Bower-Components ( JS )
 ******************/
gulp.task('vendors', function() {
    gulp.src(src.vendors)
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(src.dest))
        .pipe(connect.reload());
});



/******************
 * Styles ( LESS )
 ******************/
gulp.task('styles', function() {
    gulp.src(src.style)
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(src.dest))
        .pipe(connect.reload());
});



/******************
 * Html
 ******************/
gulp.task('templates', function() {
    gulp.src(src.templates)
        .pipe(templateCache('templates.js', {
            module: 'app'
        }))
        .pipe(gulp.dest(src.dest))
        .pipe(connect.reload())
});



/******************
 * Gulp Watch
 ******************/
gulp.task('watch', function() {
    gulp.watch('gulpfile.js', ['vendors']);
    gulp.watch([src.scripts], ['scripts']);
    gulp.watch([src.styles], ['styles']);
    gulp.watch([src.templates], ['templates']);
});


/******************
 * Connect
 ******************/
gulp.task('connect', function() {
    connect.server({
        root: src.app,
        livereload: true
    });
});

// /******************
//  * Node Server
//  ******************/
// gulp.task('server:start', function() {
//     server.listen({
//         path: src.server
//     });
// });

// gulp.task('server:restart', function() {
//     gulp.watch([src.server], server.restart);
// });

gulp.task('develop', function () {
  nodemon({ script: 'server.js', ext: 'html js' })
    .on('change', [])
    .on('restart', function () {
      console.log('restarted!')
      connect.reload();
    })
})

/******************
 * Gulp Default
 ******************/
gulp.task('default', ['scripts', 'styles', 'vendors', 'templates', 'connect', 'develop', 'watch']);
