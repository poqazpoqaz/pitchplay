// reducer.js
import {
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
  } from './action';
  
  const initialState = {
    posts: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_POST:
        return { ...state, posts: [...state.posts, action.payload] };
  
      case UPDATE_POST:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post.id === action.payload.id
              ? { ...post, ...action.payload.updatedPost }
              : post
          ),
        };
  
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter((post) => post.id !== action.payload),
        };
  
      case ADD_COMMENT:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post.id === action.payload.postId
              ? { ...post, comments: [...post.comments, action.payload.comment] }
              : post
          ),
        };
  
      case UPDATE_COMMENT:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post.id === action.payload.postId
              ? {
                  ...post,
                  comments: post.comments.map((comment) =>
                    comment.id === action.payload.commentId
                      ? { ...comment, ...action.payload.updatedComment }
                      : comment
                  ),
                }
              : post
          ),
        };
  
      case DELETE_COMMENT:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post.id === action.payload.postId
              ? {
                  ...post,
                  comments: post.comments.filter(
                    (comment) => comment.id !== action.payload.commentId
                  ),
                }
              : post
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  