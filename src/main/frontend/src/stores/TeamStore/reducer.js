import {
    CHANGE_TEAM_NAME,
    CHANGE_TEAM_CODE,
    CHANGE_TEAM_IMG,
    CHANGE_TEAM_DESCRIPTION,
    CHANGE_TEAM_LEVEL,
    CHANGE_TEAM_DAY,
    CHANGE_TEAM_TIME,
    CHANGE_TEAM_CITY,
    CHANGE_TEAM_LOC,
    CHANGE_TEAM_AGE,
    CHANGE_TEAM_GENDER,
    CHANGE_CURRENT_MEMBER,
    CHANGE_TOTAL_MEMBER,
    CHANGE_TEAM_MEMBER,
    CHANGE_COLLECTION_TITLE,
    RESET_STATE
} from "./action";

// 초기값 설정
export const initialState = {
    teamName: "",
    teamCode: "",
    teamImg: "",
    teamDescription: "",
    teamLevel: [],
    teamDay: [],
    teamTime: [],
    teamCity: "",
    teamLoc: "",
    teamAge: [],
    teamGender: "",
    teamMember: [],
    currentMember: "",
    totalMember: "",
    collectionTitle: ""
}


// state와 action을 매개변수로 받음
export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_TEAM_NAME:
            return { ...state, teamName: action.payload };
        case CHANGE_TEAM_CODE:
            return { ...state, teamCode: action.payload };
        case CHANGE_TEAM_IMG:
            return { ...state, teamImg: action.payload };
        case CHANGE_TEAM_DESCRIPTION:
            return { ...state, teamDescription: action.payload };
        case CHANGE_TEAM_LEVEL:
            return { ...state, teamLevel: action.payload };
        case CHANGE_TEAM_DAY:
            return { ...state, teamDay: action.payload };
        case CHANGE_TEAM_TIME:
            return { ...state, teamTime: action.payload };
        case CHANGE_TEAM_CITY:
            return { ...state, teamCity: action.payload };
        case CHANGE_TEAM_LOC:
            return { ...state, teamLoc: action.payload };
        case CHANGE_TEAM_AGE:
            return { ...state, teamAge: action.payload };
        case CHANGE_TEAM_GENDER:
            return { ...state, teamGender: action.payload };
        case CHANGE_CURRENT_MEMBER:
            return { ...state, currentMember: action.payload };
        case CHANGE_TOTAL_MEMBER:
            return { ...state, totalMember: action.payload };
        case CHANGE_COLLECTION_TITLE:
            return { ...state, collectionTitle: action.payload };
        case CHANGE_TEAM_MEMBER:
            const { name, role, actionType } = action.payload;
            const updatedMembers = [...state.teamMember];

            // 삭제 로직
            if (actionType === "delete") {
                return {
                    ...state,
                    teamMember: updatedMembers.filter(member => member.name !== name),
                };
            }

            const memberIndex = updatedMembers.findIndex(member => member.name === name);
            if (memberIndex >= 0) {
                // 수정 로직: 같은 이름의 멤버가 이미 있을 때 업데이트
                updatedMembers[memberIndex] = { name, role };
            } else if (actionType === "add") {
                // 추가 로직: 같은 이름의 멤버가 없고 actionType이 "add"일 때만 추가
                updatedMembers.push({ name, role });
            }
            return { ...state, teamMember: updatedMembers };
            
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}

