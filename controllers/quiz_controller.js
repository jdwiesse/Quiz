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
   res.render('quizes/show',{ quiz : req.quiz ,errors:[]});

};

//get /quizes/answer
exports.answer = function(req,res) {
	var resultado ='incorrecto';
	if(req.query.respuesta ===  req.quiz.respuesta){
		resultado = 'Correcto';
		}
	 res.render('quizes/answer' ,{quiz:req.quiz,respuesta: resultado,errors:[]});

};

// get /quizes

exports.index = function(req,res) {
   var busqueda = " "
   if 	(req.query.search===undefined){busqueda = "%"}
    else {busqueda = "%"+req.query.search.replace(/\s/g,"%")+"%"}	
   models.Quiz.findAll({where:["pregunta like ?",busqueda]}).then(function(quizes){
   res.render('quizes/index.ejs' ,{quizes : quizes ,errors:[]});
}).catch(function(error){ next(error);})
};

// get /author
exports.author = function(req,res) {
	res.render('author',{autor: 'Javier Wiesse',foto : '/images/foto.JPG',video: '/images/ContaminaciondelAgua.mp4',errors:[]} );
};
 

//get /quizes/buscar
exports.buscar = function(req,res) {
	res.render('quizes/buscar',{errors:[]});

};

//get /quizes/new
exports.new = function(req,res) {
	var quiz = models.Quiz.build( 				
	   {pregunta: "Pregunta1", respuesta: "Respuesta"}
	);

	res.render('quizes/new',{quiz:quiz,errors:[]});

};

	//guardar en DB los campos
 	//console.log(quiz.pregunta);
/// /quizes/create

exports.create = function(req,res) {
	  var quiz = models.Quiz.build( req.body.quiz );

  quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
	 	   quiz
			.save({fields: ["pregunta","respuesta"]}) 
			.then(function(){res.redirect('/quizes')})
			 //redireciona lista de pregunta
		}
	 }	
     ).catch(function(error){next(error)});
};
