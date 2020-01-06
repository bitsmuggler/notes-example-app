let gulp = require('gulp');
let webserver = require('gulp-webserver');

gulp.task('webserver', () => {
  gulp.src('./client')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      proxies: [ {
        source: '/notebooks', target: 'http://localhost:3000/notebooks'
      }]
    }));
});