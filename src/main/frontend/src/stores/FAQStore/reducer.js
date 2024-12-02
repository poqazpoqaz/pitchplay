// reducer.js
import {
  CHANGE_POST,
  CHANGE_COMMENT
} from './action';

// 초기 상태 정의
export const initialState = 
    {
      faqNumber: "",
        userId: "",
        writeNickname: "",
        title: "",
        content: "",
        date: "",
        status: "",
        views: 123,
        comments: [
            {userNickname: "", comment: ""},
            {userNickname: "", comment: ""}
        ]
    }


// 리듀서 함수 정의
export const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_POST:
      return {...state, content : action.payload};

      case CHANGE_COMMENT:
        return {...state, comment : action.payload};
    
        
    default:
      return state;
  }
};

// default export로 내보내기
export default reducer;
