// import gulp from 'gulp';
// import sass from 'gulp-sass';
// import cssnano from 'gulp-cssnano';
// import rev from 'gulp-rev';
// import uglify from 'gulp-uglify';
// import imagemin from 'gulp-imagemin';
// import {deleteAsync} from 'del';



// gulp.task('css', function(done){
//     console.log('minifying css...');
//     gulp.src('./assets/**/*.css')
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets/'));

//     return gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });


// gulp.task('js', function(done){
//     console.log('minifying js...');
//      gulp.src('./assets/**/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done()
// });


// gulp.task('images', function(done){
//     console.log('compressing images...');
//     gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });


// // empty the public/assets directory
// gulp.task('clean:assets', function(done){
//     deleteAsync('./public/assets');
//     done();
// });

// gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
//     console.log('Building assets');
//     done();
// });