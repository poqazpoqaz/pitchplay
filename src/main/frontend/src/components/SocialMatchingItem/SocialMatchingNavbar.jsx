import TitleText from "../TitleText";
import SearchInput from "../SearchInput";  // 기존 SearchInput을 그대로 사용
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
        grid-template:
            '... ... ...' 10px 
            '... title ...' auto
            '... ... ...' 10px
            '... inp ...' 1fr
            '... ... ...' 10px/ 1fr 3fr 1fr;

        padding: 15px;

        h1 {
            font-size: 2rem;
        }
    }
`;

    function SocialMatchingNavbar({ gridArea, filteredData , onSearchButtonClick  }) {

    return (
        <Wrapper style={{ gridArea: gridArea }}>
            <TitleText size="xlarge" gridArea="title">소셜매칭</TitleText>
            <SearchInput 
                gridArea="inp" 
                onClick={onSearchButtonClick}
                filteredData={filteredData}
            />
        </Wrapper>
    );
}

export default SocialMatchingNavbar;
