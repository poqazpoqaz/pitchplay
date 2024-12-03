import Button from "../Button";
import styled from "styled-components";


const Wrapper = styled.div`
    padding: 20px;
    border: 1px solid #A0A0A0;
    border-radius: 15px;
`;


// 세부 정보 박스 스타일
const DetailsBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin: 20px 0px;
    text-align: center;
    background-color: #F1F1F1;
    border-radius: 15px;

    p {
        font-size: 1.2rem;
        color: #666;
        margin: 10px 0;
    }

    .detail-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .detail-item>p:nth-of-type(1){
    font-weight: bold;
    }
`;

// 비용 스타일
const CostBox = styled.div`
    text-align: center;

    h1 {
        font-size: 2.2rem;
        font-weight: 700;
        color: #164F92;
        margin-bottom: 10px;
    }

    p {
        font-size: 1rem;
        color: #999;
        font-weight: 400;
    }
`;


function MatchingApplicationDetails({ matchingLoc, teamSize, matchingDate, matchingCost, gridArea, onClick }) {
    return (
        <Wrapper style={{ gridArea: gridArea }}>
            <h3>매칭 신청</h3>
            <DetailsBox>
                <div className="detail-item">
                    <p>매칭 장소</p>
                    <p>{matchingLoc}</p>
                </div>
                <div className="detail-item">
                    <p>매칭 인원</p>
                    <p>{teamSize}</p>
                </div>
                <div className="detail-item">
                    <p>매칭 날짜</p>
                    <p>{matchingDate}</p>
                </div>
            </DetailsBox>
            <CostBox>
                <h1>{matchingCost} 캐시</h1>
                <p>경기시간 1일전까지 최소인원 미달 시에 환불됩니다.</p>
            </CostBox>
            <Button color="var(--main-color)" size="xlarge" onClick={onClick}>신청하기</Button>
        </Wrapper>
    );
}

export default MatchingApplicationDetails;