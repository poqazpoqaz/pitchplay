import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const StyledLink = styled(motion.create(Link))`
    border-radius: 10px;
    border: 2px solid var(--main-color);
    background: ${props => props.color};  
    margin: 5px 0px;

    &:hover{
    background: #ffffff;  // color가 없으면 기본 흰색
    color: ${props => props.color}; // background color가 있으면 흰색, 없으면 검정색
    }
`;
// StyledButton 컴포넌트 정의
const StyledButton = styled(motion.button)`
    width: 100%;
    height: 100%;
    color: ${props => props.color ? '#ffffff' : '#000000'}; // background color가 있으면 흰색, 없으면 검정색
    font-weight: bold;
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

function Button({ color, onClick, children, type, gridArea, size, to }) {
    return (
        <StyledLink
            style={{ gridArea: gridArea }}
            to={to}
            color={color}
            whileTap={{
                scale: 0.9
            }}>
            <StyledButton
                color={color}
                onClick={onClick}
                type={type}
                size={size}
            >
                {children}
            </StyledButton>
        </StyledLink>
    );
}

export default Button;