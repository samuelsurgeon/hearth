import { 
  SET_POSTS,
  SET_POST,
  LOADING_DATA, 
  LOADING_UI,
  LIKE_POST, 
  UNLIKE_POST, 
  DELETE_POST,
  SUBMIT_POST,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
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

export const getPost = postId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios.get(`/post/${postId}`)
    .then(res => {
      dispatch({
        type: SET_POST,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err => console.log(err));
}

export const submitPost = newPost => dispatch => {
  dispatch({ type: LOADING_UI });
  axios.post('/post', newPost)
    .then(res => {
      dispatch({
        type: SUBMIT_POST,
        payload: res.data
      });
      dispatch(clearErrors());
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

export const submitComment = (postId, commentData) => dispatch => {
  axios.post(`/post/${postId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
        //payload: { postId: postId, comment: res.data }
        // payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
}

export const deletePost = postId => dispatch => {
  axios.delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch(err => console.log(err));
}

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios.get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: null
      })
    })
}

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
}
