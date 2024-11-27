import styled from "styled-components";

const StyledDiv = styled.div`
    background: var(--main-color);
    grid-area: status;
    color: #ffffff;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px 20px 0px 0px;
    width: 120px;
    height: 50px;
`;

const StyleP = styled.p`
    display: block;
    border: 2px solid var(--main-color);
    border-radius: 0px 15px 15px 15px;
    background-color: #ffffff;
    height: 100%;
    padding: 10px;
    font-size: 1.5rem;
    color: #333;

    @media (max-width: 768px) {
        font-size: 1.4rem;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%; 
`;

function TeamDescription({ content, gridArea }) {
    return (
        <Wrapper style={{ gridArea: gridArea }}>
            <StyledDiv>팀 소개</StyledDiv>
            <StyleP>{content.teamDescription}</StyleP>
        </Wrapper>
    );
}

export default TeamDescription;