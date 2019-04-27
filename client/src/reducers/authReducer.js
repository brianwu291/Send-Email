import { FETCH_USER } from '../actions/actionTypes';

export default (state = null, action) => {
	// console.log(action);
  switch (action.type) {
  	case FETCH_USER:
  		return action.payload || false;
  		// first time load the page, deciding whether the user login in or not.
    default:
      return state;
  }
}

// take state and action object as argrument
// state should have an initial value
