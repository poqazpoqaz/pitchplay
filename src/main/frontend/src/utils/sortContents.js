// 정렬하는 함수
export const sortContents = (data, option) => {
    return [...data].sort((a, b) => {
        if (option === "최신순") {
            return new Date(b.writtenDate) - new Date(a.writtenDate); // 날짜 내림차순
        } else if (option === "오래된순") {
            return new Date(a.writtenDate) - new Date(b.writtenDate); // 날짜 오름차순
        }
        return 0;
    });
};

// 객체 형식
export const sortObjectContents = (contents, option) => {
    return contents.sort((a, b) => {
        const dateA = new Date(a.social.writtenDate);
        const dateB = new Date(b.social.writtenDate);

        // 최신순
        if (option === "최신순") {
            return dateB - dateA;
        }
        // 오래된순
        if (option === "오래된순") {
            return dateA - dateB;
        }

        return 0; // 기본적으로 정렬하지 않음
    });
};