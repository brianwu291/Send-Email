import { FETCH_SURVEYS } from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
  	case FETCH_SURVEYS:
  		return action.payload;
  		// first time load the page, deciding whether the user login in or not.
    default:
      return state;
  }
}
