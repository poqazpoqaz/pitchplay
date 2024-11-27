// 드롭다운 옵션
export const dropdownOption = ["최신순", "오래된순"];

// 정렬하는 함수
export const sortContents = (data, option) => {
    return [...data].sort((a, b) => {
        if (option == "최신순") {
            return new Date(b.date) - new Date(a.date); // 날짜 내림차순
        } else if (option == "오래된순") {
            return new Date(a.date) - new Date(b.date); // 날짜 오름차순
        }
        return 0;
    })
}