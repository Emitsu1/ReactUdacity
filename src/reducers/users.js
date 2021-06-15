import { RECEIVE_USERS } from "../actions/users";
import { APPEND_ANSWER } from "../actions/shared";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case APPEND_ANSWER:
      return {
        ...state,
        [action.answerData.authedUser]: {
          ...state[action.answerData.authedUser],
          answers: {
            ...state[action.answerData.authedUser].answers,
            [action.answerData.qid]: action.answerData.answer,
          },
        },
      };
    default:
      return state;
  }
}
