import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const StyledLink = styled(motion.create(Link))`
    display: flex;
    justify-content: center;
    border-radius: 10px;
    border: 2px solid var(--main-color);
    background: ${props => props.color};  
    margin: 5px 0px;

    &:hover{
    background: ${props => props.color ? "#ffffff" : "var(--main-color)"};  // color가 없으면 기본 main색
    color: ${props => props.color ? props.color : "#ffffff"}; // background color가 있으면 흰색, 없으면 검정색
    }
`;
// StyledButton 컴포넌트 정의
const StyledButton = styled(motion.button)`
    width: 100%;
    height: 100%;
    color: ${props => props.color ? '#ffffff' : 'var(--main-color)'}; // background color가 있으면 흰색, 없으면 검정색
    font-weight: bold;
    font-size: ${(props) => {
        switch (props.size) {
            case 'small':
                return '10px';
            case 'medium':
                return '18px';
            case 'large':
                return '20px';
            case 'xlarge':
                return '30px';
            default:
                return '15px';  // 기본값 설정
        }
    }};

    &:hover{
    color: ${props => props.color ? props.color : "#ffffff"}; // background color가 있으면 흰색, 없으면 검정색

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
            case 'xlarge':
                return '25px';
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
            case 'xlarge':
                return '1rem';
            default:
                return '0.8rem';  // 기본값을 좀 더 작은 크기로 설정
        }
    }};
    }
`;

function Button({ color, onClick, children, type, gridArea, size, to }) {
    return (
        <StyledLink
            style={{ gridArea: gridArea }}
            to={to}
            color={color}
            onClick={onClick}
            whileTap={{
                scale: 0.9,
            }}>
            <StyledButton
                color={color}
                type={type}
                size={size}
            >
                {children}
            </StyledButton>
        </StyledLink>
    );
}
export default Button;