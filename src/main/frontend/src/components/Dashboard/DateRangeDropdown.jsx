import Dropdown from "../../components/Dropdown";
import { subDays, subMonths, startOfWeek, addDays, format } from "date-fns";
import { useState } from "react";

// 날짜 범위를 일주일 간격으로 생성하는 함수
const generateWeeklyRanges = () => {
    const today = new Date();
    const lastMonthStart = subMonths(today, 1); // 한 달 전의 시작
    const ranges = [];

    // 한 달 전부터 오늘까지 일주일 간격으로 날짜 범위 생성
    let startOfWeekDate = startOfWeek(lastMonthStart); // 한 달 전 첫 번째 주의 시작 날짜
    let endOfWeekDate = addDays(startOfWeekDate, 6); // 일주일 간격 끝 날짜

    // 오늘까지 반복해서 범위 생성
    while (startOfWeekDate <= today) {
        const range = `${format(startOfWeekDate, "yyyy.MM.dd")} ~ ${format(endOfWeekDate, "yyyy.MM.dd")}`;
        ranges.push(range);

        // 다음 주로 이동
        startOfWeekDate = addDays(endOfWeekDate, 1);
        endOfWeekDate = addDays(startOfWeekDate, 6);
    }

    return ranges;
};

function DateRangeDropdown({ onSelect, gridArea }) {
    const weeklyRanges = generateWeeklyRanges();
    const [selectedRange, setSelectedRange] = useState(null);

    const handleChange = (value) => {
        setSelectedRange(value);
        onSelect(value); // 선택된 범위 부모 컴포넌트로 전달
    };

    return (
        <Dropdown
            options={weeklyRanges}
            selected={selectedRange}
            onChange={handleChange}
            text="날짜 범위 선택"
            gridArea={gridArea}
        />
    );
}

export default DateRangeDropdown;