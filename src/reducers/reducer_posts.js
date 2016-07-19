import { FETCH_POSTS, FETCH_SINGLE_POST } from '../actions/index';

const INITIAL_STATE = { all: [], single_post: null};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_SINGLE_POST:
    return {
      ...state,
      single_post: action.payload.data
    }
  case FETCH_POSTS:
    return {
      ...state,
      all: action.payload.data
    };
  default:
    return state;
  }
}
