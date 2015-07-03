var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz',errors: []});
}); 

//autoload cd commandos con quizId
router.param('quizId',quizController.load);

router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
router.get('/author',quizController.author);
router.get('/quizes/buscar',quizController.buscar);
router.get('/quizes/new',quizController.new);
router.post('/quizes/create',quizController.create);

module.exports = router;
