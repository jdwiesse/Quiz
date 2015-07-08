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
   var busqueda = " ";
   var portema = "2" ;	
if 	(req.query.tema===undefined){ portema="1";
   if 	(req.query.search===undefined){busqueda = "%"}
    else {busqueda = "%"+req.query.search.replace(/\s/g,"%")+"%"}
    }
    else {busqueda = req.query.tema}	
 if (portema==="1") {
   models.Quiz.findAll({where:["pregunta like ?",busqueda]}).then(function(quizes){
   res.render('quizes/index.ejs' ,{quizes : quizes ,errors:[]});
}).catch(function(error){ next(error);})}
	else {
	models.Quiz.findAll({where:["tema like ?",busqueda]}).then(function(quizes){
   	res.render('quizes/index.ejs' ,{quizes : quizes ,errors:[]});
}).catch(function(error){ next(error);})
	}

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
	   {tema: "Tema" ,pregunta: "Pregunta", respuesta: "Respuesta"}
	);

	res.render('quizes/new',{quiz:quiz,errors:[]});

};

	//guardar en DB los campos
 	//console.log(quiz.pregunta);
/// /quizes/create

exports.create = function(req,res) {
  var quiz = models.Quiz.build( req.body.quiz );


	 	   quiz
			.save({fields: ["tema","pregunta","respuesta"]}) 
			.then(function(){res.redirect('/quizes')})
			 //redireciona lista de pregunta
		

};

// get quizes :id/edit

exports.edit = function(req,res) {
	var quiz = req.quiz; //autoload
	res.render('quizes/edit',{quiz:quiz,errors:[]});
};

//put /quizes/:id
exports.update = function(req,res) {
console.log("hola1");
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	req.quiz
	.save( { fields : ["pregunta","respuesta"]})
	.then(function(){res.redirect('/quizes');});
};

//delete /quizes/ :id
exports.destroy = function(req,res) {
console.log("hola");
	req.quiz.destroy().then( function(){
		res.redirect('/quizes');
	}).catch(function(error){next(erros)})
};