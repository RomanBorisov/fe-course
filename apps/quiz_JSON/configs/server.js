const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser)
server.post('/calculate-result', (req, res) => {
    const questions = router.db.get('questions').value();
    const answers = req.body.answers;
    let correctAnswers = 0;

    answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        
        if (!question) {
            console.warn(`Question with id ${answer.questionId} not found`);
            return;
        }
        
        const correctQuestionAnswer = question.answers.find(a => a.correct);
        
        if (!correctQuestionAnswer) {
            console.warn(`No correct answer found for question ${answer.questionId}`);
            return;
        }
    
        if (correctQuestionAnswer.id === answer.answerId) {
            correctAnswers++;
        }
    });

    res.json({
        score: correctAnswers
    });
});

server.post('/check-answer', (req, res) => {
    const questions = router.db.get('questions').value();
    const userAnswerId = req.body.answerId;
    const userQuestionId = req.body.questionId;

    const question = questions.find(q => q.id === userQuestionId);
    const correctQuestionAnswerId = question.answers.find(answer => answer.correct).id;

    const isCorrect = userAnswerId === correctQuestionAnswerId;

    res.json({
        isCorrect,
        correctAnswerId: correctQuestionAnswerId
    });
});



// Use default router
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
