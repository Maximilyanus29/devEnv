var gulp = require('gulp');
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('cssnano'),
	rename = require('rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant')
	cache = require('gulp-cache')
	autoprefixer = require('gulp-autoprefixer');
	

gulp.task('sass', function(){
	return gulp.src('app/sass/*.sass')  //берем файл
	.pipe(sass()) //preobrazuem
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'],{cascade: true}))
	.pipe(gulp.dest('app/css')) //vivodim
	.pipe(browserSync.reload({stream: true})) // reload broser sync
});

// gulp.task('scripts', function(){
// 	return gulp.src(['app',])
// 	.pipe(concat('libs.min.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('app/js'));
// });  
// Подключить в watch scripts

// gulp.task('csslibs', function(){
// 	return gulp.src('app/css/libs.css')
// 	.pipe(cssnano())
// 	.pipe(rename({suffix:'.min'}))
// 	.pipe(gulp.dest('app/css'))
// });
// минификация css подключить в watch

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('clean', function(){
	return cache.clearAll();
});

gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlacerd: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'))
});

gulp.task('watch', ['browser-sync', 'sass'], function(){
	gulp.watch('app/sass/*.sass',['sass']);
	gulp.watch('app/*.html', browserSync.reload)
	gulp.watch('app/js/**/*.js', browserSync.reload)
});

gulp.task('build', ['clean', 'sass', 'img'], function(){
	var buildCss = gulp.src('app/css/main.css')
	.pipe(gulp.dest('dist/css'));
	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
	var buildJs = gulp.src('app/js/*')
	.pipe(gulp.dest('dist/js'));
	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});
