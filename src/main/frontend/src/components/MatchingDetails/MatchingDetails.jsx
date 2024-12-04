import styled from "styled-components";
import clock from "/public/imgs/clock.svg";
import gender from "/public/imgs/gender.svg";
import stadium from "/public/imgs/stadium.svg";
import ping from "/public/imgs/ping.svg";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
    padding: 20px;
    border: 1px solid #A0A0A0;
    border-radius: 15px;
    font-size: 1.3rem;

    @media (max-width: 1024px) {
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 15px;
    }
`;

const SubWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 8px;
    }
`;

const Items = styled(motion.div)`
    display: flex;
    align-items: center;
    gap:20px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1); /* hover 시 크기 10% 증가 */
    }

    img {
        width: 20px;
        height: 20px;

        @media (max-width: 768px) {
            width: 16px;
            height: 16px;
        }
    }

    p {
        margin: 0;
        white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
        overflow: hidden; /* 넘치는 내용 숨기기 */
        text-overflow: ellipsis; /* 말줄임 표시 */
        flex: 1; /* 텍스트 영역이 가능한 공간 채우기 */
    }
`;

function MatchingDetails({ teamGender, teamSize, matchingLoc, matchingDate, gridArea }) {
    return (
        <Wrapper style={{ gridArea: gridArea }}>
            <h3>매치정보</h3>
            <SubWrapper>
                <Items
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img src={gender} />
                    <p>{teamGender}</p>
                </Items>
                <Items
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <img src={stadium} />
                    <p>{teamSize}</p>
                </Items>
                <Items
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <img src={ping} />
                    <p>{matchingLoc}</p>
                </Items>
                <Items
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <img src={clock} />
                    <p>{matchingDate}</p>
                </Items>
            </SubWrapper>
        </Wrapper>
    );
}

export default MatchingDetails;