var gulp = require('gulp');
var browserSync = require('browser-sync');

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '.'
    },
    snippetOptions: {
      ignorePaths: 'assets/bower/**/*'
    }
  });
  gulp.watch([
  	'index.html', 
  	'assets/styles/**/*.css', 
  	'assets/scripts/**/*.js',
  	'assets/webcomponents/**/*'
  ]).on('change', browserSync.reload);
  
});