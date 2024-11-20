import styled from 'styled-components';
import { motion } from 'framer-motion';

// StyledButton 컴포넌트 정의
const StyledButton = styled(motion.button)`
        background: '#FFFFFF';  // color가 없으면 기본 흰색
        color: ${props => props.color ? '#000000' : '#FFFFFF'}; // background color가 있으면 흰색, 없으면 검정색
        font-weight: bold;
        margin: 20px 30px; 
        padding: 10px 20px;
        border-radius: 15px;
        border: 2px solid var(--main-color);

        &:hover{
            background: ${props=> props.color};  // color가 없으면 기본 흰색
            color: #ffffff; // background color가 있으면 흰색, 없으면 검정색
        }
    `;

function Button({ color, children }) {
    return (
        <StyledButton color={color}>{children}</StyledButton>
    );
}

export default Button;

// 사용방법 : <Button color='var(--main-color)'>안녕</Button>