import { LOGIN_USER, REGISTER_USER } from '../_actions/action_type';

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, login: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    default:
      return state;
  }
}
