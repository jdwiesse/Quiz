var path = require('path');

//cargar Modelo ORM
var Sequelize = require('sequelize');

//usar BBDD Sqlite
var sequelize = new Sequelize(null,null,null,
		{dialect:"sqlite",storage:"quiz.sqlite"});

//importar la definicion de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz; //exportar definicion de quiz

//sequelize.sync crea e inicializa tabla de preguntas en Bd
sequelize.sync().success(function(){
	Quiz.count().success(function(count){
	  if(count===0){
		Quiz.create({pregunta : 'Capital de Italia1',
				respuesta : 'Roma'})
		.success(function(){console.log('base datos inicializada')});
};});
	});