import * as restService from './rest.js';

export async function getQuestions() {
    return await restService.get('questions');
}

export async function calculateResult(answers) {
    return await restService.post('calculate-result', {answers});
}

export async function checkAnswer(answerId, questionId) {
    return await restService.post('check-answer', {answerId, questionId});
}
