import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledDiv = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid var(--main-color);
    background: ${props => props.isSelected ? 'var(--main-color)' : '#fff'};  /* 선택된 버튼에만 색상 적용 */
    margin: 5px 0px;
    cursor: pointer;
    width: 100%;  /* 부모 요소의 너비에 맞게 크기 자동 조정 */
    padding: 5px;

    &:hover {
        background: #ffffff;
        color: #000000;  /* 모든 버튼 hover 시 글씨를 검은색으로 변경 */
    }
`;

const StyledButton = styled(motion.button)`
    color: ${props => props.isSelected ? '#ffffff' : '#000000'};  /* 선택된 버튼은 흰색 글씨 */
    font-weight: bold;
    font-size: ${(props) => {
        switch (props.size) {
            case 'small':
                return '14px';
            case 'medium':
                return '20px';
            case 'large':
                return '24px';
            case 'xlarge':
                return '30px';
            default:
                return '18px'; 
        }
    }};
    text-align: center;
    width: 100%;  /* 버튼이 부모 크기에 맞춰 크기 자동 조정 */
    border: none;
    border-radius: 8px;

    &:hover {
        color: #000000;  /* 모든 버튼 hover 시 글씨를 검은색으로 변경 */
    }
`;

function PriceButton({ isSelected, onClick, children, size }) {
    return (
        <StyledDiv
            onClick={onClick}
            isSelected={isSelected}  // 선택된 상태 전달
            whileTap={{
                scale: 0.9,
            }}
        >
            <StyledButton
                isSelected={isSelected}  // 선택된 상태 전달
                size={size}
            >
                {children}
            </StyledButton>
        </StyledDiv>
    );
}

export default PriceButton;
