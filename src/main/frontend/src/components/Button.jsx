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

        &:hover{
            background: #ffffff;  // color가 없으면 기본 흰색
            color: ${props => props.color}; // background color가 있으면 흰색, 없으면 검정색
        }
    `;

function Button({ color, onClick, children, type, gridArea }) {
    return (
        <StyledButton
            color={color}
            onClick={onClick}
            type={type}
            style={{ gridArea: gridArea }}
        >
            {children}</StyledButton>
    );
}

export default Button;

// 사용방법 : <Button color='var(--main-color)'>안녕</Button>