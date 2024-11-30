import styled from "styled-components";
import clock from "/public/imgs/clock.svg";
import gender from "/public/imgs/gender.svg";
import stadium from "/public/imgs/stadium.svg";
import ping from "/public/imgs/ping.svg";

const Wrapper = styled.div`
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

const Items = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

function MatchingDetails({ matchingState, gridArea }) {
    return (
        <Wrapper style={{ gridArea: gridArea }}>
            <h3>매치정보</h3>
            <SubWrapper>
                <Items>
                    <img src={gender} />
                    <p>{matchingState.gender}</p>
                </Items>
                <Items>
                    <img src={stadium} />
                    <p>{matchingState.teamSize}</p>
                </Items>
                <Items>
                    <img src={ping} />
                    <p>{matchingState.location}</p>
                </Items>
                <Items>
                    <img src={clock} />
                    <p>{matchingState.matchingDate}</p>
                </Items>
            </SubWrapper>
        </Wrapper>
    )
}

export default MatchingDetails;