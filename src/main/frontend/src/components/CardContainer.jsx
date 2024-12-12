import React, { useState } from 'react';
import FieldCard from './FieldCard';
import CircularButton from '../components/CircularButton/CircularButton';

function CardContainer({ fieldsData }) {
    const [visibleCount, setVisibleCount] = useState(1); // 처음 표시할 카드 수

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 5, fieldsData.length));
    };

    return (
        <div style={containerStyle}>
            {fieldsData.slice(0, visibleCount).map((field) => (
                <FieldCard key={field.SVCID} {...field} />
            ))}

            {/* 더 보기 버튼 */}
            {visibleCount < fieldsData.length && (
                <CircularButton onClick={handleLoadMore} />
            )}
        </div>
    );
}

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
};

export default CardContainer;
