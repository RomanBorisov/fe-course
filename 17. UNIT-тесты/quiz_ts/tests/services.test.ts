import { getQuestions } from '../src/app/services/questions-service';
import { calculateResult, checkAnswer } from '../src/app/services/quiz-service';

jest.mock('../src/app/services/rest', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

const { get, post } = require('../src/app/services/rest');

describe('Quiz Service API Functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch questions from the API', async () => {
        const mockQuestions = [
            {
                id: 1,
                question: 'What is the capital of France?',
                answers: [
                    { id: 1, text: 'Paris', correct: true },
                    { id: 2, text: 'Berlin', correct: false },
                ],
            },
        ];
        get.mockResolvedValue(mockQuestions);

        const questions = await getQuestions();

        expect(get).toHaveBeenCalled();
        expect(questions).toEqual(mockQuestions);
    });

    it('should calculate the result via API', async () => {
        const mockResult = { score: 3 };
        post.mockResolvedValue(mockResult);

        const result = await calculateResult([{ questionId: 1, answerId: 1 }]);
        expect(post).toHaveBeenCalledWith('calculate-result', { answers: [{ questionId: 1, answerId: 1 }] });
        expect(result).toEqual(mockResult);
    });

    it('should check the answer via API', async () => {
        const mockCheck = { isCorrect: true, correctAnswerId: 1 };
        post.mockResolvedValue(mockCheck);

        const result = await checkAnswer(1, 1);
        expect(post).toHaveBeenCalledWith('check-answer', { answerId: 1, questionId: 1 });
        expect(result).toEqual(mockCheck);
    });
});
