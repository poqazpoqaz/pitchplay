import styled from "styled-components";

const Wrapper = styled.div`
    border: 1px solid #A0A0A0;
    border-radius: 15px;
    width: 100%;
    height: auto;
`;

const TitleWrapper = styled.div`
    background: ${props => props.color};
    color: white;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 15px 15px 0px 0px;
    padding: 10px;
`

const ContentWrapper = styled.div`
    padding: 20px;
`

function PostDetailCard({ title, children, color }) {
    return (
        <Wrapper>
            <TitleWrapper color={color}>{title}</TitleWrapper>
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </Wrapper>
    )
}

export default PostDetailCard;