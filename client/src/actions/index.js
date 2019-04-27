import axios from 'axios';
import {
  FETCH_USER,
  SUBMIT_SURVEYS,
  FETCH_SURVEYS
} from './actionTypes.js';

export const fetchUser = () =>
  // 當appltmiddleware把redux-thunk包住，看到action-creator回傳了函數，
  // redux-thunk會去執行這個callback function，並把dispatch函數作為參數傳入
  // 這個callback function 其實有兩個參數，dispatch 跟 getState，可以取得目前的 state
  async dispatch => {
    const res = await axios.get('/api/current_user');
    //console.log(res);
    dispatch({
      type: FETCH_USER,
    	payload: res.data
    });
  };
// handle stripe token request 的 action creator
export const handleStripeToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
}

export const submitSurveys = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });

  dispatch({
    type: SUBMIT_SURVEYS,
    payload: res.data
  });
};

export const fetchSurveys = () =>  async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({
    type: FETCH_SURVEYS,
    payload: res.data
  });
};
