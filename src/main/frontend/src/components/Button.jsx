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
            {children}</StyledButton>
    );
}

export default Button;

// 사용방법 : <Button color='var(--main-color)'>안녕</Button>