// action.js
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const addPost = (post) => ({ type: ADD_POST, payload: post});
export const updatePost = (id, updatedPost) => ({ type: UPDATE_POST, payload: { id, updatedPost }});
export const deletePost = (id) => ({ type: DELETE_POST, payload: id});
export const addComment = (postId, comment) => ({ type: ADD_COMMENT, payload: { postId, comment}});
export const updateComment = (postId, commentId, updatedComment) => ({ type: UPDATE_COMMENT, payload: { postId, commentId, updatedComment }});
export const deleteComment = (postId, commentId) => ({ type: DELETE_COMMENT, payload: { postId, commentId }});
