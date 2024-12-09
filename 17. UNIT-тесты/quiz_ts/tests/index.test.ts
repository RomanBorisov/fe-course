/**
 * @jest-environment jsdom
 */
import {
    initializeDOM,
    showQuestion,
    resetState,
    createAnswerButton,
    startQuiz, setQuestions, goToNextQuestion, showScore,
} from '../src/app/index';
import { IAnswer } from '../src/app/models/answer';
import { IQuestion } from '../src/app/models/question';

const setupDOM = () => {
    document.body.innerHTML = `
        <h2 id="question-text"></h2>
        <div id="answer-buttons"></div>
        <button id="next-btn"></button>
    `;
};

describe('Quiz DOM Functions', () => {
    beforeEach(() => {
        setupDOM();
        initializeDOM();

        const mockQuestions: IQuestion[] = [
            {
                id: 1,
                question: 'What is the capital of France?',
                answers: [
                    { id: 1, text: 'Paris', correct: true },
                    { id: 2, text: 'Berlin', correct: false },
                    { id: 3, text: 'Madrid', correct: false },
                ],
            },
        ];
        setQuestions(mockQuestions);
        (global as any).currentQuestionIdx = 0;
    });

    it('should display the question and answers in the DOM', () => {
        showQuestion();

        const questionText = document.querySelector<HTMLHeadingElement>('#question-text');
        expect(questionText?.textContent).toBe('1. What is the capital of France?');

        const answerButtons = document.querySelectorAll<HTMLButtonElement>('#answer-buttons button');
        expect(answerButtons.length).toBe(3);
        expect(answerButtons[0].textContent).toBe('Paris');
        expect(answerButtons[1].textContent).toBe('Berlin');
        expect(answerButtons[2].textContent).toBe('Madrid');
    });

    it('should reset the DOM state', () => {
        resetState();

        const nextBtn = document.querySelector<HTMLButtonElement>('#next-btn');
        expect(nextBtn?.style.display).toBe('none');

        const answerButtons = document.querySelectorAll<HTMLButtonElement>('#answer-buttons button');
        expect(answerButtons.length).toBe(0);
    });

    it('should create an answer button', () => {
        const answer: IAnswer = { id: 1, text: 'Paris', correct: true };
        createAnswerButton(answer);

        const button = document.querySelector<HTMLButtonElement>('#answer-buttons button');
        expect(button).not.toBeNull();
        expect(button?.textContent).toBe('Paris');
        expect(button?.dataset.id).toBe('1');
    });

    it('should start the quiz and reset the state', () => {
        startQuiz();

        expect((global as any).currentQuestionIdx).toBe(0);
        const questionText = document.querySelector<HTMLHeadingElement>('#question-text');
        expect(questionText?.textContent).toBe('1. What is the capital of France?');
    });
});
