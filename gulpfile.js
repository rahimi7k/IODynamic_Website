var gulp = require('gulp');
var gzip = require('gulp-gzip');

gulp.task('compress', function() {
    return new Promise(function(resolve, reject) {
        resolve(gulp.src(['./dist/**/*.*'])
        .pipe(gzip())
        .pipe(gulp.dest('./dist')));

    })
});
