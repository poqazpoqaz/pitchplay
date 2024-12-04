import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeFaqNumber,
    changeUserId,
    changeWriteNickname,
    changeTitle,
    changeContent,
    changeDate,
    changeStatus,
    changeViews,
    changeComment,
    changeUserNickname,
    changeCategory,
    updateAllFields,
    resetState
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // FAQ 번호 변경 메서드
        changeFaqNumber: (faqNumber) => dispatch(changeFaqNumber(faqNumber)),
        // 사용자 ID 변경 메서드
        changeUserId: (userId) => dispatch(changeUserId(userId)),
        // 작성자 닉네임 변경 메서드
        changeWriteNickname: (writeNickname) => dispatch(changeWriteNickname(writeNickname)),
        // 제목 변경 메서드
        changeTitle: (title) => dispatch(changeTitle(title)),
        // 내용 변경 메서드
        changeContent: (content) => dispatch(changeContent(content)),
        // 작성 날짜 변경 메서드
        changeDate: (date) => dispatch(changeDate(date)),
        // 상태 변경 메서드
        changeStatus: (status) => dispatch(changeStatus(status)),
        // 조회수 변경 메서드
        changeViews: (views) => dispatch(changeViews(views)),
        // 댓글 변경 메서드
        changeComment: (comments) => dispatch(changeComment(comments)),
        // 사용자 닉네임 변경 메서드
        changeUserNickname: (userNickname) => dispatch(changeUserNickname(userNickname)),
        // 카테고리 변경 메서드
        changeCategory: (category) => dispatch(changeCategory(category)),
        //전체 변경
        updateAllFields: (fields) => dispatch(updateAllFields(fields)),
        //초기화
        resetState: () => dispatch(resetState())
    };

    return { state, actions };
};
