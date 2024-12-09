import { IQuestion } from './models/question';
import { IAnswer, IUserSelectedAnswer } from './models/answer';
import { calculateResult, checkAnswer } from './services/quiz-service';
import { getQuestions } from './services/questions-service';
import '../styles/index.scss'; // Импорт стилей

let questionEl: HTMLHeadingElement | null = null;
let answerBtns: HTMLDivElement | null = null;
let nextBtn: HTMLButtonElement | null = null;

let currentQuestionIdx = 0;
export let questions: IQuestion[] = [];
let answers: IUserSelectedAnswer[] = [];

export function initializeDOM() {
    questionEl = document.querySelector<HTMLHeadingElement>('#question-text');
    answerBtns = document.querySelector<HTMLDivElement>('#answer-buttons');
    nextBtn = document.querySelector<HTMLButtonElement>('#next-btn');

    if (!questionEl || !answerBtns || !nextBtn) {
        throw new Error('Failed to initialize DOM elements');
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    initializeDOM();
    await init();
});

export async function init() {
    nextBtn!.addEventListener('click', async () => {
        if (currentQuestionIdx < questions.length) {
            await goToNextQuestion();
        } else {
            startQuiz();
        }
    });

    questions = await getQuestions();

    startQuiz();
}

export function startQuiz() {
    currentQuestionIdx = 0;
    showQuestion();
}

export function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIdx];
    const questionNumber = currentQuestionIdx + 1;

    questionEl!.innerHTML = `${questionNumber}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(createAnswerButton);
}

export function resetState() {
    nextBtn!.style.display = 'none';
    while (answerBtns!.firstChild) {
        answerBtns!.removeChild(answerBtns!.firstChild);
    }
}

export function createAnswerButton(answer: IAnswer) {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.type = 'button';
    button.classList.add('button', 'question__answer');
    answerBtns!.appendChild(button);

    button.dataset.id = answer.id.toString();
    button.addEventListener('click', selectAnswer);
}

export async function selectAnswer(e: MouseEvent) {
    const selectedBtn = e.target as HTMLButtonElement;
    if (!selectedBtn.dataset.id) {
        throw new Error('Cannot find id info');
    }
    const answerId = +selectedBtn.dataset.id;
    const { isCorrect, correctAnswerId } = await checkAnswer(answerId, questions[currentQuestionIdx].id);

    if (isCorrect) {
        selectedBtn.classList.add('question__answer--correct');
    } else {
        selectedBtn.classList.add('question__answer--incorrect');
    }

    Array.from(answerBtns!.children)
        .filter((element) => element instanceof HTMLButtonElement)
        .forEach((b: Element) => {
            const button = b as HTMLButtonElement;

            if (!button.dataset.id) {
                throw new Error('Cannot find id info');
            }

            if (+button.dataset.id === correctAnswerId) {
                button.classList.add('question__answer--correct');
            }
            button.disabled = true;
        });

    answers.push({
        questionId: questions[currentQuestionIdx].id,
        answerId,
    });
    nextBtn!.style.display = 'block';
}

export async function goToNextQuestion() {
    currentQuestionIdx++;
    if (currentQuestionIdx < questions.length) {
        showQuestion();
    } else {
        await showScore();
    }
}

export async function showScore() {
    resetState();
    const { score } = await calculateResult(answers);
    answers = [];

    questionEl!.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn!.innerHTML = 'Play Again';
    nextBtn!.style.display = 'block';
}
export function setQuestions(newQuestions: IQuestion[]) {
    questions = newQuestions;
}
