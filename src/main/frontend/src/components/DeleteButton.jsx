import { motion } from "framer-motion"
import styled from "styled-components"

const StyledButton = styled(motion.button)`
    font-weight: bold;
    font-size: ${(props) => {
        switch (props.size) {
            case 'xsmall': 
                return '10px';
            case 'small':
                return '20px';
            case 'medium':
                return '26px';
            case 'large':
                return '30px';
            default:
                return '24px';  // 기본값 설정
        }
    }};
    color: ${props => props.color};
`

function DeleteButton({ onClick, color, size, gridArea }) {
    return (
        <StyledButton
            color = {color}
            size={size}
            initial={{ scale: 1 }}
            whileHover={{ scale: 0.8, color: "#333333" }}
            onClick={onClick}
            style={{gridArea: gridArea}}
        >X</StyledButton>
    );
}
export default DeleteButton;


// 사용법 : <DeleteButton color="white" size="small"/>