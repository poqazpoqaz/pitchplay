import styled from "styled-components"
import LogoImg from "./LogoImg";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    color: #FECACA;
    font-family: 'Lalezar', sans-serif;
`
function HeaderLogo() {
    return (
        <StyledDiv>
            <h1>PITCH</h1>
            <LogoImg/>
            <h1>PLAY</h1>
        </StyledDiv>
    )
}

export default HeaderLogo;