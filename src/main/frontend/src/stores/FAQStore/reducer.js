// reducer.js
import Category from '../../components/Category/Category';
import {
  CHANGE_FAQ_NUMBER,
  CHANGE_USER_ID,
  CHANGE_WRITE_NICKNAME,
  CHANGE_TITLE,
  CHANGE_CONTENT,
  CHANGE_DATE,
  CHANGE_STATUS,
  CHANGE_VIEWS,
  CHANGE_USER_NICKNAME,
  CHANGE_COMMENT,
  CHANGE_CATEGORY
} from './action';

// 초기 상태 정의
export const initialState =
{
  faqNumber: "",
  userId: "",
  writeNickname: "",
  title: "",
  content: "",
  Category: "",
  date: "",
  status: "",
  views: 123,
  comments: [
    { userNickname: "", comment: "" },
    { userNickname: "", comment: "" }
  ]
};


// 리듀서 함수 정의
export const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_FAQ_NUMBER:
      return { ...state, faqNumber: action.payload };
    
    case CHANGE_USER_ID:
      return { ...state, userId: action.payload };
    
    case CHANGE_WRITE_NICKNAME:
      return { ...state, writeNickname: action.payload };
    
    case CHANGE_TITLE:
      return { ...state, title: action.payload };
    
    case CHANGE_CONTENT:
      return { ...state, content: action.payload };
    
    case CHANGE_DATE:
      return { ...state, date: action.payload };
    
    case CHANGE_STATUS:
      return { ...state, status: action.payload };
    
    case CHANGE_VIEWS:
      return { ...state, views: action.payload };
    
    case CHANGE_COMMENT:
      return { ...state, comments: [...state.comments, action.payload.comment] };
    
    case CHANGE_USER_NICKNAME:
      return { ...state, userNickname: action.payload };
    case CHANGE_CATEGORY:
      return {...state, Category : action.payload};

    default:
      return state;
  }
};

export default reducer;
