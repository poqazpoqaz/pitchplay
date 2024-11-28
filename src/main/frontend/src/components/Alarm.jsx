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
    'text text text' auto
    '... btn btn' 20px / 1fr 30px 30px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    min-width: 350px;

    p {
    grid-area: text;
    padding: 20px;
    text-align: center;
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