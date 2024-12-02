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
    CHANGE_COLLECTION_TITLE,
    RESET_STATE,
    CHANGE_TEAM_MEMBER
} from "./action";


// 초기값 설정
export const initialState = {
    teamName: "피치플레이",
    teamCode: "pitchplay",
    teamImg: "/public/imgs/1.jpg",
    teamDescription: "피치플레이는 피치플레이 시작때부터 만들었던 팀입니다. ",
    teamLevel: ["비기너"],
    teamDay: ["월", "목"],
    teamTime: [],
    teamCity: "서울",
    teamLoc: "동작구",
    teamAge: ["10대", "40대"],
    teamGender: "혼성",
    teamMember: [
        { name: "박상진", role: "Manager" },
        { name: "권은지", role: "Manager" },
        { name: "백승우", role: "Manager" },
        { name: "금규환", role: "Member" },
        { name: "오재헌", role: "Member" },
        { name: "표건우", role: "Member" },
        { name: "유수현", role: "Member" },
        { name: "김진혁", role: "Member" },
        { name: "최혜린", role: "Member" },
        { name: "장은지", role: "Member" }
      ],
    currentMember: 10,
    totalMember: 20,
    collectionTitle: "피치플레이 팀에 함께하실 분 구합니다."

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
            return { ...state, collectionTitle: action.payload};
        case CHANGE_TEAM_MEMBER:
            const { name, role, actionType } = action.payload;
            const updatedMembers = [...state.teamMember];
            if(actionType === 'delete'){
                const memberIndex = updatedMembers.findIndex(member => member.name === name);
                if (memberIndex >= 0) {
                    updatedMembers.splice(memberIndex, 1);
                }
            }else{
            const memberIndex = updatedMembers.findIndex(member => member.name === name);
            if (memberIndex >= 0) {  
                updatedMembers[memberIndex] = { name, role };
            } else {
                updatedMembers.push({ name, role });
            }
        }
            return { ...state, teamMember: updatedMembers };
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}

