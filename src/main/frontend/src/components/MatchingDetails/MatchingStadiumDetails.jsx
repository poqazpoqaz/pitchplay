import KakaoMap from "../../pages/StadiumDetail/KakaoMap";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
    padding: 20px;
    border: 1px solid #A0A0A0;
    border-radius: 15px;
`;

const MapContainer = styled.div`
    margin: 20px 0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const LocationContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const StyledLink = styled(Link)`
    color: #ffffff;
    background-color: var(--main-color);    
    border: 1px solid var(--main-color);
    border-radius: 5px;
    padding: 5px;

    &:hover{
    background-color: #ffffff;
    border: 1px solid var(--main-color);
    color: var(--main-color);
    }
`

function MatchingStadiumDetails({ stadiumState, gridArea }) {
    return (
        <Wrapper style={{ gridArea: gridArea }}>
            <h3>구장정보 및 지도</h3>
            <MapContainer>
                <KakaoMap lat={stadiumState.stadiumY} lng={stadiumState.stadiumX} />
            </MapContainer>
            <LocationContainer>
                <p>{stadiumState.stadiumAddress}</p>
                <StyledLink to={`/stadium/${stadiumState.stadiumId}`}>자세히보기</StyledLink>
            </LocationContainer>
        </Wrapper>
    )
}

export default MatchingStadiumDetails;