var gulp 	= require('gulp'), // Núcleo do Gulp
 	jshint 	= require('gulp-jshint'), 
 	uglify 	= require('gulp-uglify'), // Transforma o javascript em formato ilegível para humanos
 	concat 	= require('gulp-concat'), // Agrupa todos os arquivos em um
 	rename 	= require('gulp-rename'),
 	watch 	= require('gulp-watch');

var paths = {
	scripts: [	'./js/app.js', // Arquivo único
			'./lib/angular/*.*', // Todos os arquivos do diretório angular e sub diretórios
			'./lib/bootstrap/*.*' // Todos os arquivos do diretório bootstrap e sub diretórios
		],
	css: [	'./css/*',
			'./lib/angular/*.*', // Todos os arquivos do diretório angular e sub diretórios
			'./lib/bootstrap/*.*'
		]
};

// Tarefa de minificação do Javascript
gulp.task('js', function() {
	return gulp.src(paths.scripts)  // Arquivos que serão carregados, veja variável 'js' no início
	.pipe(concat('all.js')) // Arquivo único de saída
	.pipe(rename({extname: '.min'}))
	.pipe(uglify()) // Transforma para formato ilegível	
	.pipe(gulp.dest('./dist/')); // pasta de destino do arquivo(s)
});

// Tarefa jshint
gulp.task('lint', function() {
	return gulp.src(paths.scripts)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

// Tarefa de monitoração caso algum arquivo seja modificado, deve ser executado e deixado aberto, comando "gulp watch".
gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['js', 'lint']);
});

// Tarefa padrão quando executado o comando GULP
gulp.task('default', ['watch', 'js', 'lint']);

