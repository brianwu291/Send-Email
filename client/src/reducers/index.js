import { combineReducers } from 'redux'; //結合所有的 reducers
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});

// combineReducers 會接受一個物件參數。
// 這個物件的各個 key/value pairs 就是reducer們
// key(物件屬性名稱) 非常重要，因為它同時也是這些
// reducer處理的 state object 的 key
