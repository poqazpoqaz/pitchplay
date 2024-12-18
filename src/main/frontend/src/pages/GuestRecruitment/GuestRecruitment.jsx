import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import GuestPlayerRecruitment from "../../components/GuestPlayerRecruitment/GuestPlayerRecruitment";
import Dropdown from "../../components/Dropdown";
import CircularButton from "../../components/CircularButton/CircularButton";
import Button from "../../components/Button";
import Modal from "../../components/Modal/Modal";
import Checkbox from "../../components/Checkbox/Checkbox";
import { formattedDate } from "../../utils/formattedDate";
import { sortContents } from "../../utils/sortContents";
import { DROPDOWN_OPTIONS } from "../../utils/constants";
import styles from "./GuestRecruitment.module.css";
import axios from "axios";

function GuestRecruitment() {
    const { isFiltered, filterCriteria } = useOutletContext();
    const [allData, setAllData] = useState([]); // 전체 데이터
    const [filteredContents, setFilteredContents] = useState([]); // 필터링된 및 정렬된 데이터
    const [visibleCount, setVisibleCount] = useState(5); // 표시할 데이터 개수
    const [selectedOption, setSelectedOption] = useState("최신순"); // 정렬 옵션

    const [reservationList, setReservationList] = useState([]); // 모달용 예약 리스트
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(0);

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/collectionsData.json");
                const datas = response.data;
                setAllData(datas);
                setFilteredContents(sortContents(datas, selectedOption)); // 초기 정렬
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };
        fetchData();
    }, []);

    // 필터링 및 정렬
    useEffect(() => {
        let updatedData = [...allData];

        if (isFiltered && filterCriteria) {
            updatedData = updatedData.filter((item) => {
                const conditions = [];

                if (filterCriteria.gender?.length > 0) {
                    conditions.push(filterCriteria.gender.some(gender => item.teamGender.includes(gender)));
                }

                if (filterCriteria.locDetail?.trim()) {
                    conditions.push(item.teamLoc.includes(filterCriteria.locDetail));
                }

                if (filterCriteria.matchingDate?.start && filterCriteria.matchingDate?.end) {
                    const date = new Date(item.collectionTime);
                    const start = new Date(filterCriteria.matchingDate.start);
                    const end = new Date(filterCriteria.matchingDate.end);
                    conditions.push(date >= start && date <= end);
                }

                if (filterCriteria.teamSize?.length > 0) {
                    conditions.push(filterCriteria.teamSize.includes(item.teamSize));
                }

                return conditions.every(Boolean);
            });
        }

        setFilteredContents(sortContents(updatedData, selectedOption));
    }, [isFiltered, filterCriteria, allData, selectedOption]);

    // 새 글 작성 클릭 처리
    const handleReservationClick = async () => {
        try {
            const [reservationResponse, stadiumResponse] = await Promise.all([
                axios.get("/data/reservationData.json"),
                axios.get("/data/stadiumData.json"),
            ]);

            const reservations = reservationResponse.data.map((res) => {
                const stadium = stadiumResponse.data.find((stadium) => stadium.SVCID === res.stadiumId);
                return {
                    reservationNumber: res.reservationNumber,
                    reservationDate: res.reservationDate,
                    stadium: stadium ? stadium.SVCNM : "알 수 없는 경기장",
                };
            });

            setReservationList(reservations);
            setIsModalOpen(true);
        } catch (error) {
            console.error("데이터 로드 실패:", error);
            alert("예약 정보를 가져오는 데 실패했습니다.");
        }
    };

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 5, filteredContents.length));
    };

    return (
        <div className={styles["guestrecruitment-grid"]}>
            <Button
                gridArea="btn2"
                color="#606060"
                size="large"
                onClick={handleReservationClick}
            >
                새 글 작성
            </Button>
            <Dropdown
                options={DROPDOWN_OPTIONS}
                selected={selectedOption}
                onChange={(option) => setSelectedOption(option)}
                text="정렬기준"
                gridArea="drop"
            />
            <div className={styles["guestrecruitment-items"]}>
                {filteredContents.slice(0, visibleCount).map((content, index) => (
                    <GuestPlayerRecruitment key={index} content={content} />
                ))}
            </div>
            <CircularButton onClick={handleLoadMore} gridArea="btn" />

            {isModalOpen && (
                <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
                    {reservationList.map((data, index) => (
                        <Checkbox
                            key={index}
                            isChecked={isSelected === index}
                            onClick={() => setIsSelected(index)}
                        >
                            {formattedDate(data.reservationDate)} - {data.stadium}
                        </Checkbox>
                    ))}
                    <Button color="var(--main-color)" to={`/${reservationList[isSelected]?.reservationNumber}/newguest`}>
                        확인
                    </Button>
                </Modal>
            )}
        </div>
    );
}

export default GuestRecruitment;
