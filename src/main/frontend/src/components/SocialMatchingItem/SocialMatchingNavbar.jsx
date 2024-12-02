import TitleText from "../TitleText";
import SearchInput from "../SearchInput";
import styled from "styled-components";

const Wrapper = styled.div`
    border: 3px solid #F1F1F1;
    background: #ffffff;
    padding: 20px;
    border-radius: 20px;
    display: grid;
    grid-template: 
    '... ... ...' 50px
    '... title ... ' 3fr
    '... ... ...' 20px
    '... inp ...' 1fr 
    '... ... ...' 50px / 1fr 5fr 1fr ;

    @media (max-width: 768px) {
        /* 화면 크기가 768px 이하일 때 grid 변경 */
        grid-template:
            '... ... ...' 10px 
            '... title ...' auto
            '... ... ...' 10px
            '... inp ...' 1fr
            '... ... ...' 10px/ 1fr 3fr 1fr;

        padding: 15px; /* padding을 조금 줄여줌 */

        /* 제목 글자 크기 조정 */
        h1 {
            font-size: 2rem;
        }
    }
`;

function SocialMatchingNavbar({gridArea}) {
    return (
        <Wrapper style={{gridArea: gridArea}}>
            <TitleText size="xlarge" gridArea="title">소셜매칭</TitleText>
            <SearchInput gridArea="inp" />
        </Wrapper>
    );
}

export default SocialMatchingNavbar;