import styled from 'styled-components';
import { motion } from 'framer-motion';

// StyledButton 컴포넌트 정의
const StyledButton = styled(motion.button)`
    background: ${props => props.color};  
    color: ${props => props.color ? '#ffffff' : '#000000'}; // background color가 있으면 흰색, 없으면 검정색
    font-weight: bold;
    margin: 0 10px 10px 10px;
    border-radius: 10px;
    border: 2px solid var(--main-color);
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

    &:hover{
        background: #ffffff;  // color가 없으면 기본 흰색
        color: ${props => props.color}; // background color가 있으면 흰색, 없으면 검정색
    }

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
        margin: 0 8px 8px 8px;  // 화면이 작아질수록 margin 좁히기
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
        margin: 0 5px 5px 5px;  // 더 작은 화면에서는 margin 더욱 좁히기
    }
`;

function Button({ color, onClick, children, type, gridArea, size }) {
    return (
        <StyledButton
            color={color}
            onClick={onClick}
            type={type}
            style={{ gridArea: gridArea }}
            size={size}
            whileTap={{
                scale: 0.9
            }}
        >
            {children}
        </StyledButton>
    );
}

export default Button;