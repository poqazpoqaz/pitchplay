import styled from 'styled-components';
import { motion } from 'framer-motion';

// StyledButton 컴포넌트 정의
const StyledButton = styled(motion.button)`
        background: #F1F1F1;  
        color: #808080; // background color가 있으면 흰색, 없으면 검정색
        font-weight: bold;
        margin: 5px 0px;
        border-radius: 10px;
        border: 2px solid #F5F5F5;
        font-size: ${(props) => {
        switch (props.size) {
            case 'small':
                return '10px';
            case 'medium':
                return '18px';
            case 'large':
                return '20px';
            default:
                return '15px';  // 기본값 설정
        }
    }};
        /* 미디어 쿼리로 반응형 스타일 추가 */
    @media (max-width: 1024px) {
        font-size: ${(props) => {
        switch (props.size) {
            case 'small':
                return '12px';
            case 'medium':
                return '16px';
            case 'large':
                return '18px';
            default:
                return '14px'; // 기본값 조정
        }
    }};
    }

    @media (max-width: 760px) {
        font-size: ${(props) => {
        switch (props.size) {
            case 'small':
                return '0.5rem';
            case 'medium':
                return '0.7rem';
            case 'large':
                return '0.9rem';
            default:
                return '0.8rem';  // 기본값을 좀 더 작은 크기로 설정
        }
    }};
    }
    cursor: default;
    `;

function DisabledButton({ children, gridArea, size }) {
    return (
        <StyledButton
            disabled
            type="button"
            style={{ gridArea: gridArea }}
            size={size}
        >
            {children}</StyledButton>
    );
}

export default DisabledButton;