import styled from "styled-components";

const StyledDiv1 = styled.div`
    display: grid;
    grid-template: 
    'title' 1fr
    'content' 1fr / 1fr;
`;

const StyledP1 = styled.p`
    font-size: 1.4rem;
    font-weight: bold;
    grid-area: title;
    color: var(--main-color);
`;

const StyledDiv2 = styled.div`
    font-size: 1.2rem;
    border: 1px solid #CCCCCC;
    border-radius: 15px;
    padding: 5px;
    grid-area: content;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

function TeamProfileText({ children, content }) {
    return (
        <StyledDiv1>
            <StyledP1>{content}</StyledP1>
            <StyledDiv2>{children}</StyledDiv2>
        </StyledDiv1>
    );
}

export default TeamProfileText;