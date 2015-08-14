var models = require('../models/models.js');

// get /quizes /:quizid/comment/new

exports.new = function(req , res) {
	res.render('comments/new.ejs',{quizid: req.params.quizId, errors: []});
};

// post /quizes/:quizid/comments

exports.create = function(req,res){
	var comment = models.Comment.build(
		{texto: req.body.comment.texto, QuizId: req.params.quizId }
	);

				comment //save
				.save()
				.then( function(){ res.redirect('/quizes/'+req.params.quizId)})

		
};
