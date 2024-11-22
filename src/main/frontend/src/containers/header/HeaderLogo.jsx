import styled from "styled-components";
import soccer from "../../assets/soccer.svg";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: #FECACA;
    font-family: 'Lalezar', sans-serif;
    height: 100%;
    width: 100%;
`;

const StyledImg = styled.img`
    filter: drop-shadow(-7px 5px 4px rgba(0, 0, 0, 0.5)); /* 그림자 효과 */
    width: 80px;
    height: 80px; 
`;

function HeaderLogo() {
    return (
        <a href="/">
        <StyledDiv>
                <h1>PITCH</h1>
                <StyledImg src={soccer} />
                <h1>PLAY</h1>

        </StyledDiv>
        </a>
    );
}

export default HeaderLogo;