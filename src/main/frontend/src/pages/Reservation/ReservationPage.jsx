import React, { useState, useEffect } from 'react';
import CardContainer from '../../components/CardContainer';
import GujangNavbar from '../../components/GujangNavbar/GujangNavbar';

function ReservationPage({ gridArea }) {
    const [fieldsData, setFieldsData] = useState([]); // 전체 구장 데이터
    const [filteredFieldsData, setFilteredFieldsData] = useState([]); // 필터링된 구장 데이터

    // 필터링 함수
    const applyFilters = () => {
        const filterCriteria = JSON.parse(localStorage.getItem('TotalSet'));

        if (!filterCriteria) return;

        const filteredList = fieldsData.filter((field) => {
            const conditions = [];

            if (filterCriteria.locDetail && filterCriteria.locDetail.trim() !== "") {
                const locationMatch = field.AREANM.includes(filterCriteria.locDetail);
                conditions.push(locationMatch); // 지역 조건
            }

            if (filterCriteria.priceRange) {
                const priceMatch = field.PAYATNM <= filterCriteria.priceRange.max &&
                                   field.PAYATNM >= filterCriteria.priceRange.min;
                conditions.push(priceMatch); // 가격 조건
            }

            return conditions.every(Boolean);
        });

        setFilteredFieldsData(filteredList); // 필터링 결과 저장
    };

    // 데이터 초기 로드
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/data/stadiumData.json');
            const data = await response.json();
            setFieldsData(data); // 전체 데이터 저장
            setFilteredFieldsData(data); // 초기 데이터
        };

        fetchData();
    }, []);

    return (
        <div style={{ gridArea: gridArea }}>
            <GujangNavbar onSearchButtonClick={applyFilters} />
            <CardContainer fieldsData={filteredFieldsData} />
        </div>
    );
}

export default ReservationPage;
