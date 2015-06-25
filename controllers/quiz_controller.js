var models = require('../models/models.js');

//autoload -factoriza el codigo si ruta incluye :quisId

exports.load = function(req,res,next,quizId){
	models.Quiz.find(quizId).then(
	function(quiz) {
	   if(quiz) {
		req.quiz =quiz;
		next();	
	} else {next (new Error('No existe quizId = ' + quisId));}
	}
	).catch(function(error){ next(error);});
};

//get /quizes/id
exports.show = function(req,res) {
   res.render('quizes/show',{ quiz : req.quiz});

};

//get /quizes/answer
exports.answer = function(req,res) {
	var resultado ='incorrecto';
	if(req.query.respuesta ===  req.quiz.respuesta){
		resultado = 'Correcto';
		}
	 res.render('quizes/answer' ,{quiz:req.quiz,respuesta: resultado});

};

// get /quizes

exports.index = function(req,res) {
   var busqueda = " "
   if 	(req.query.search===undefined){busqueda = "% %"}
    else {busqueda = "%"+req.query.search.replace(/\s/g,"%")+"%"}	
   models.Quiz.findAll({where:["pregunta like ?",busqueda]}).then(function(quizes){
   res.render('quizes/index.ejs' ,{quizes : quizes});
}).catch(function(error){ next(error);})
};

// get /author
exports.author = function(req,res) {
	res.render('author',{autor: 'Javier Wiesse',foto : '/images/foto.JPG',video: '/images/ContaminaciondelAgua.mp4'} );
};
 

//get /quizes/buscar
exports.buscar = function(req,res) {
	res.render('quizes/buscar');

};
