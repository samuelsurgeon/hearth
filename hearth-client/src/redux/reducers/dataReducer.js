import { 
  SET_POSTS, 
  SET_POST,
  LIKE_POST, 
  UNLIKE_POST, 
  LOADING_DATA,
  DELETE_POST,
  SUBMIT_POST,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case SET_POST:
      return {
        ...state,
        post: action.payload
      }
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        let temp = state.post.comments;
        state.post = action.payload;
        state.post.comments = temp;
      }
      return {
        ...state
      }
    case DELETE_POST:
      // index = state.posts.findIndex(post => post.postId === action.payload);
      // state.posts.splice(index, 1);
      return {
        ...state,
        posts: state.posts.filter(post => post.postId !== action.payload)
      }
    case SUBMIT_POST:
      return {
        ...state,
        posts: [
          action.payload,
          ...state.posts
        ]
      }
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
          commentCount: state.post.commentCount + 1
        }
      };
      /*
      index = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      let updatedPosts = JSON.parse(JSON.stringify(state.posts));
      updatedPosts[index].commentCount += 1;
      return {
        ...state,
        posts: updatedPosts,
        post: {
          ...state.post,
          comments: [action.payload.comment, ...state.post.comments],
          commentCount: state.post.commentCount + 1
        }
      };
      */
    default:
      return state;
  }
}
