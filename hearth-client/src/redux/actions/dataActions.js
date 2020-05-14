import { 
  SET_POSTS, 
  LOADING_DATA, 
  LOADING_UI,
  LIKE_POST, 
  UNLIKE_POST, 
  DELETE_POST,
  SUBMIT_POST,
  SET_ERRORS,
  CLEAR_ERRORS
} from '../types';
import axios from 'axios';

export const getPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios.get('/posts')
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_POSTS,
        payload: []
      })
    })
};

export const submitPost = newPost => dispatch => {
  dispatch({ type: LOADING_UI });
  axios.post('/post', newPost)
    .then(res => {
      dispatch({
        type: SUBMIT_POST,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const likePost = postId => dispatch => {
  axios.get(`/post/${postId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_POST,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}

export const unlikePost = postId => dispatch => {
  axios.get(`/post/${postId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}

export const deletePost = postId => dispatch => {
  axios.delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch(err => console.log(err));
}

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
}
