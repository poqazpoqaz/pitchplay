import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import DeleteButton from "./DeleteButton";

const Wrapper = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; 
    height: 100%; 
    display: flex; 
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    background: rgba(0, 0, 0, 0.1); /* 반투명 배경 */
    z-index: 9999;
`;
const AlarmBox = styled.div`
    display: grid;
    grid-template: 
    '... ... del' 10px
    'text text text' 1fr
    '... btn btn' 20px / 1fr 30px 30px;
    background: white; /* 알람 박스 배경 */
    padding: 20px;
    border-radius: 10px; /* 모서리를 둥글게 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
    width: 300px; /* 알람 박스 너비 */
    height: 200px; /* 알람 박스 높이 */

    p {
    grid-area: text;
    padding: 20px;
    }

    `;

const StyledLink = styled(Link)`
    grid-area: btn;
    background-color: #E3E3E3;
    border-radius: 5px;
    text-align: center;
    color: #1E1E1E;
    font-size: 15px;
`;

function Alarm({ isOpen, to, closeAlarm, children, btntext, onClick }) {
    return (
        <>
            {isOpen &&
                <Wrapper
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <AlarmBox>
                        <p>{children}</p>
                        <DeleteButton size="xsmall" onClick={closeAlarm} gridArea="del" />
                        <StyledLink to={to} onClick={onClick}>
                            {btntext}
                        </StyledLink>
                    </AlarmBox>
                </Wrapper>
            }
        </>
    )
}

export default Alarm;