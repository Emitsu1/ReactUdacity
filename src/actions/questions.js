export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export function receieveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}