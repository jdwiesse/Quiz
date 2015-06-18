//get /quizes/question
exports.question = function(req,res) {
   res.render('quizes/question' ,{pregunta: 'Capital de italia'});
};

//get /quizes/answer
exports.answer = function(req,res) {
	if(req.query.respuesta ==='Roma'){
		res.render('quizes/answer' ,{respuesta: 'Correcto'});
} else {res.render('quizes/answer' ,{respuesta: 'Incorrecto'});

}
};

// get /author
exports.author = function(req,res) {
	res.render('author',{autor: 'Javier Wiesse',foto : '/images/foto.JPG',video: '/images/ContaminaciondelAgua.mp4'} );
};
