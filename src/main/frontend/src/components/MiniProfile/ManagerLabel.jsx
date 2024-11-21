import styled from "styled-components";

const StyledDiv = styled.div`
    background: var(--main-color);
    border-radius: 10px;
`;

const StyledP = styled.p`
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    font-size: 12px;
    padding: 3px 10px;
`;

function ManagerLabel(){
    return(
        <StyledDiv>
            <StyledP>운영진</StyledP>
        </StyledDiv>
    )
}

export default ManagerLabel;