import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import GuestPlayerRecruitment from "../../components/GuestPlayerRecruitment/GuestPlayerRecruitment";
import Dropdown from "../../components/Dropdown";
import CircularButton from "../../components/CircularButton/CircularButton";
import styles from "./GuestRecruitment.module.css";
import Button from "../../components/Button";
import Modal from "../../components/Modal/Modal";
import Checkbox from "../../components/Checkbox/Checkbox";
import { formattedDate } from "../../utils/formattedDate";
import { sortContents } from "../../utils/sortContents";
import { DROPDOWN_OPTIONS } from "../../utils/constants";
import axios from "axios";

function GuestRecruitment() {
    const { isFiltered, filterCriteria } = useOutletContext();

    const [reservationList, setReservationList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(0);

    const [selectedOption, setSelectedOption] = useState("최신순");
    const [allData, setAllData] = useState([]);
    const [filteredContents, setFilteredContents] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/collectionsData.json");
                const datas = response.data;
                setAllData(datas);
                setFilteredContents(sortContents(datas, selectedOption)); // 초기 정렬 적용
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };
        fetchData();
    }, []);

    // 필터링 및 정렬 적용
    useEffect(() => {
        let updatedData = [...allData];
    
        if (isFiltered && filterCriteria) {
            updatedData = updatedData.filter((item) => {
                const conditions = [];
    
                // 성별 필터링
                if (filterCriteria.gender && filterCriteria.gender.length > 0) {
                    const genderMatch = filterCriteria.gender.some((gender) =>
                        item.teamGender.includes(gender)
                    );
                    conditions.push(genderMatch);
                }
                
    
                // 지역 필터링 (locDetail 사용)
                if (filterCriteria.locDetail && filterCriteria.locDetail.trim() !== "") {
                    conditions.push(item.teamLoc.includes(filterCriteria.locDetail));
                }
    
                // 날짜 필터링
                if (
                    filterCriteria.matchingDate &&
                    filterCriteria.matchingDate.start &&
                    filterCriteria.matchingDate.end
                ) {
                    const collectionDate = new Date(item.collectionTime);
                    const startDate = new Date(filterCriteria.matchingDate.start);
                    const endDate = new Date(filterCriteria.matchingDate.end);
                    conditions.push(collectionDate >= startDate && collectionDate <= endDate);
                }

                if (filterCriteria.teamSize && filterCriteria.teamSize.length > 0) {
                    const teamSizeMatch = filterCriteria.teamSize.includes(item.teamSize);
                    conditions.push(teamSizeMatch); // 팀 크기 조건 추가
                }
                
    
                return conditions.some(Boolean); // 하나라도 조건 만족 시 true
            
            
            });
        }
    
        // 정렬 적용
        const sortedData = sortContents(updatedData, selectedOption);
        setFilteredContents(sortedData);
    }, [isFiltered, filterCriteria, allData, selectedOption]);

    // 더 보기 버튼 클릭
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, filteredContents.length));
    };

    // 새 글 작성 클릭
    const handleReservationClick = async () => {
        alert("새 글 작성 기능은 별도 구현 필요");
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
                    <Button color="var(--main-color)" to={`/${reservationList[isSelected].reservationNumber}/newguest`}>
                        확인
                    </Button>
                </Modal>
            )}
        </div>
    );
}

export default GuestRecruitment;
