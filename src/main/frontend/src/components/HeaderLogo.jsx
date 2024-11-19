import styled from "styled-components"
import soccer from "../assets/soccer.svg"

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    color: #FECACA;
    font-family: 'Lalezar', sans-serif;
`
const StyledImg = styled.img`
    filter: drop-shadow(-7px 5px 4px rgba(0, 0, 0, 0.5)); /* 그림자 효과 */
`


function HeaderLogo() {
    return (
        <StyledDiv>
            <h1>PITCH</h1>
            <StyledImg src={soccer} />
            <h1>PLAY</h1>
        </StyledDiv>
    )
}

export default HeaderLogo;