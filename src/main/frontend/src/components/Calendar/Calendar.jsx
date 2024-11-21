import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  isWithinInterval,
} from "date-fns";
import "./Calendar.css";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (day) => {
    if (!selectedRange.start || selectedRange.end) {
      setSelectedRange({ start: day, end: null });
    } else {
      setSelectedRange({ ...selectedRange, end: day });
    }
  };

  const renderDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>이전</button>
        <h2>{format(currentMonth, "yyyy년 MM월")}</h2>
        <button onClick={handleNextMonth}>다음</button>
      </div>


      <div className="selected-range">
        <input
          type="text"
          readOnly
          value={selectedRange.start ? format(selectedRange.start, "yyyy-MM-dd") : ""}
          placeholder="시작일"
        />
        <input
          type="text"
          readOnly
          value={selectedRange.end ? format(selectedRange.end, "yyyy-MM-dd") : ""}
          placeholder="종료일"
        />
      </div>

      <div className="calendar-grid">
        <div className="week-days">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
        </div>

        <div className="dates">
          {renderDays().map((day, index) => {
            const isSelectedStart = isSameDay(day, selectedRange.start);
            const isSelectedEnd = isSameDay(day, selectedRange.end);
            const isInRange =
              selectedRange.start &&
              selectedRange.end &&
              isWithinInterval(day, {
                start: selectedRange.start,
                end: selectedRange.end,
              });

            return (
              <div
                key={index}
                className={`date ${isSameMonth(day, currentMonth) ? "" : "disabled"} ${
                  isSelectedStart ? "selected-start" : ""
                } ${isSelectedEnd ? "selected-end" : ""} ${
                  isInRange && !isSelectedStart && !isSelectedEnd ? "in-range" : ""
                }`}
                onClick={() => handleDateClick(day)}
              >
                {format(day, "d")}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
