import styled from "styled-components";
import soccer from "../../assets/soccer.svg";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: #FECACA;
    font-family: 'Lalezar', sans-serif;
    height: 100%;
    width: 100%;
    
    h1{
        margin: 0 auto;
    }
`;

const StyledImg = styled.img`
    filter: drop-shadow(-7px 5px 4px rgba(0, 0, 0, 0.5)); /* 그림자 효과 */
    width: 80px;
    height: 80px; 
`;

function HeaderLogo() {
    return (
        <Link to="/">
            <StyledDiv>
                <h1>PITCH</h1>
                <StyledImg src={soccer} />
                <h1>PLAY</h1>

            </StyledDiv>
        </Link>
    );
}

export default HeaderLogo;