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
			const { qid, answer, authedUser } = action.answerData;

			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers,
						[qid]: answer
					}
				}
			};
    default:
      return state;
  }
}
