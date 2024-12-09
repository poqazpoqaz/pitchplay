import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import styles from './StadiumReservation.module.css';

function StadiumReservation({ reservedTimeSlots, setReservedTimeSlots }) {
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = React.useState("");

    const timeSlots = [
        "08:00-10:00",
        "10:00-12:00",
        "12:00-14:00",
        "14:00-16:00",
        "16:00-18:00",
        "18:00-20:00",
    ];

    // 현재 날짜와 시간을 가져오는 함수
    const getCurrentDateTime = () => {
        const now = new Date();
        return {
            currentDate: now.toISOString().split("T")[0],
            currentTime: now.getHours() * 100 + now.getMinutes(), // 시간을 HHMM 형태로 반환
        };
    };

    const { currentDate, currentTime } = getCurrentDateTime();

    // 특정 시간대가 현재 시간보다 이전인지 확인하는 함수
    const isTimeSlotDisabled = (slot) => {
        if (!selectedDate) return true;

        const formattedDate = selectedDate.toISOString().split("T")[0];

        // 오늘 날짜보다 이전이면 예약 불가
        if (formattedDate < currentDate) {
            return true;
        }

        // 오늘 날짜인 경우, 선택된 시간대가 현재 시간보다 이전인지 확인
        if (formattedDate === currentDate) {
            const [startHour, startMinute] = slot.split('-')[0].split(':').map(Number);
            const timeSlotTime = startHour * 100 + startMinute;

            // 현재 시간과 시간대 비교
            if (timeSlotTime < currentTime) {
                return true;
            }
        }

        return false; // 오늘 날짜가 아니면 예약 가능
    };

    const handleTimeSlotSelect = (slot) => {
        setSelectedTimeSlot(slot);
    };

    const handleReservation = () => {
        if (selectedDate && selectedTimeSlot) {
            const formattedDate = selectedDate.toISOString().split("T")[0];
            if (reservedTimeSlots[formattedDate] && reservedTimeSlots[formattedDate].includes(selectedTimeSlot)) {
                alert("이미 예약된 시간대입니다.");
                return;
            }

            setReservedTimeSlots((prev) => ({
                ...prev,
                [formattedDate]: [...(prev[formattedDate] || []), selectedTimeSlot],
            }));

            alert("예약이 신청되었습니다!");
            setSelectedTimeSlot("");
            setSelectedDate(null);
        } else {
            alert("예약 날짜와 시간을 모두 선택해주세요.");
        }
    };

    return (
        <div className={styles.datePickerWrapper}>
            <h3>예약 날짜 및 시간 선택</h3>
            <div className="dayPickerContainer">
                <DayPicker
                    className={styles.DayPicker}
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    footer={
                        selectedDate ? (
                            <p>선택한 날짜: {selectedDate.toLocaleDateString()}</p>
                        ) : (
                            <p>날짜를 선택해주세요.</p>
                        )
                    }
                />
            </div>

            <div className={styles.timePickerWrapper}>
                <label>예약 시간대:</label>
                <div className={styles.timeSlotButtons}>
                    {timeSlots.map((slot) => (
                        <button
                            key={slot}
                            className={`${styles.timeSlotButton} ${selectedTimeSlot === slot ? styles.selected : ''}`}
                            onClick={() => handleTimeSlotSelect(slot)}
                            disabled={
                                !selectedDate ||
                                (reservedTimeSlots[selectedDate.toISOString().split("T")[0]] || []).includes(slot) ||
                                isTimeSlotDisabled(slot)
                            }
                        >
                            {slot}
                            {reservedTimeSlots[selectedDate?.toISOString().split("T")[0]]?.includes(slot) && " (예약 마감)"}
                        </button>
                    ))}
                </div>
            </div>

            <button className={styles.confirmButton} onClick={handleReservation} disabled={!selectedDate || !selectedTimeSlot}>
                예약 확인
            </button>
        </div>
    );
}

export default StadiumReservation;
