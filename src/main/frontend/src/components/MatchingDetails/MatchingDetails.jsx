import styled from "styled-components";
import clock from "/public/imgs/clock.svg";
import gender from "/public/imgs/gender.svg";
import stadium from "/public/imgs/stadium.svg";
import ping from "/public/imgs/ping.svg";
import {motion} from "framer-motion";

const Wrapper = styled(motion.div)`
    padding: 20px;
    border: 1px solid #A0A0A0;
    border-radius: 15px;
    font-size: 1.3rem;

    @media(max-width: 1024px){
    font-size: 1rem;
    }
`;

const SubWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
`;

const Items = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);  // hover 시 크기 10% 증가
    }
`;

function MatchingDetails({ matchingState, gridArea }) {
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
                    <p>{matchingState.gender}</p>
                </Items>
                <Items
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <img src={stadium} />
                    <p>{matchingState.teamSize}</p>
                </Items>
                <Items
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <img src={ping} />
                    <p>{matchingState.location}</p>
                </Items>
                <Items
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <img src={clock} />
                    <p>{matchingState.matchingDate}</p>
                </Items>
            </SubWrapper>
        </Wrapper>
    );
}

export default MatchingDetails;