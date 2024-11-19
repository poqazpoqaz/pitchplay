import soccer from "../assets/soccer.svg"
import styled from "styled-components"

const StyledImg = styled.img`
    filter: drop-shadow(-7px 5px 4px rgba(0, 0, 0, 0.5)); /* 그림자 효과 */
`
function LogoImg(){
    return(
    <StyledImg src={soccer} />
)
}

export default LogoImg;