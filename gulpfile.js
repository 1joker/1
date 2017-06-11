var gulp = require("gulp")
var uglify = require('gulp-uglify');//压缩js
var minifyCss = require('gulp-minify-css');//压缩css
var minifyHtml = require('gulp-minify-html')//压缩html
var concat = require('gulp-concat');//合并文件
var webserver = require('gulp-webserver'); //web服务热启动
// var browserify = require('gulp-browserify')//模块化的打包
var rev = require('gulp-rev'); //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');//- 路径替换


	gulp.task("yasuo",['htmlmin'],function() {//压缩js
    gulp.src("src/js/*.js")//起始路径

           // .pipe(browserify({//模块化打包
           //  insertGlobals: true,
           //  debug: !gulp.env.production
           //  }))

    	.pipe(concat('common.js'))//先合并文件后压缩 启动合并js模块 合并完成的文件名是common.js
        .pipe(uglify())//启用模块
        .pipe(rev())//md5加密

        .pipe(gulp.dest("bound/js/"))//输出路径

        .pipe(rev.manifest()) // 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev/js')); //生成json(存放加密的名字)将生成的json存放到的路径
      
	})

	gulp.task("yasuo2", function() {//压缩css
    gulp.src("src/css/*.css")//起始路径
        .pipe(minifyCss())//启用模块
        .pipe(gulp.dest("bound/css/"))//输出路径
	})

	gulp.task("yasuo3", function() {//压缩html
    gulp.src("src/html/*.html")//起始路径
        .pipe(minifyHtml())//启用模块
        .pipe(gulp.dest("bound/html/"))//输出路径
	})


    gulp.task("server",["yasuo","yasuo2","yasuo3"],function() {//启动服务

        gulp.watch("./src/html/*.html",["yasuo3"])//监听事件 监听html 实现和浏览器同步刷新

    gulp.src('./bound')
        .pipe(webserver({
            livereload: true,//文件保存后，自动刷新浏览器
            directoryListing: true,
            open: "/html/"//可以指定打开文件
        }));
    })

//     gulp.task('htmlmin', function () { //替换路径
//     gulp.src(['rev/js/*.json', 'src/html/*.html'])
//         .pipe(revCollector({
//             replaceReved: true,
//             dirReplacements: {
//                 'js': './js/'
//             }
//         }))
//         .pipe(gulp.dest('bound/html'));
// });
