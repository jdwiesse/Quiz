var path = require('path');

// Postgres Database_url 
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//cargar Modelo ORM
var Sequelize = require('sequelize');

//usar BBDD Sqlite o postgres

var sequelize = new Sequelize(DB_name, user,pwd,
		{dialect:protocol,
		 protocol : protocol,
		 port : port,
		 host : host,
		 storage:storage, // solo Sqlite
		 omitNull: true // solo Postgres	
});


//importar la definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

//import definicion de la tabla comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);



exports.Quiz = Quiz; //exportar definicion de quiz
exports.Comment = Comment;


//sequelize.sync crea e inicializa tabla de preguntas en Bd
sequelize.sync().success(function(){
	Quiz.count().success(function(count){
	  if(count===0){
		Quiz.create({tema : 'humanidades',pregunta : 'Capital de italia',
				respuesta : 'Roma'});
		Quiz.create({tema : 'humanidades',pregunta : 'Capital de Portugal',
				respuesta : 'Lisboa'})
		.success(function(){console.log('base datos inicializada')});
};});
	});