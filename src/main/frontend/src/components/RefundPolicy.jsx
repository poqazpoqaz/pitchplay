import styled from "styled-components";

const Wrapper = styled.div`
    background: #F2F2F2;
    border-radius: 15px;
    padding: 20px;

    /* 작은 화면 (모바일)에서 패딩 축소 */
    @media (max-width: 768px) {
        padding: 15px;
    }
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 1.3rem;

    /* 작은 화면에서 글자 크기 축소 */
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

const SubTitle = styled.p`
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 10px;

    /* 작은 화면에서 글자 크기 축소 */
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;

    div {
        margin: 10px;
    }

    p:nth-of-type(2),
    p:nth-of-type(3),
    p:nth-of-type(4),
    p:nth-of-type(5) {
        margin-left: 15px;
    }

    /* 작은 화면에서 마진 간격 축소 */
    @media (max-width: 768px) {
        padding: 5px;

        div {
            margin: 5px;
        }

        p:nth-of-type(2),
        p:nth-of-type(3),
        p:nth-of-type(4),
        p:nth-of-type(5) {
            margin-left: 10px;
        }
    }
`;

function RefundPolicy({gridArea}) {
    return (
        <Wrapper style={{gridArea: gridArea}}>
            <Title>취소 및 환불 규정</Title>
            <ContentWrapper>
                <div>
                    <SubTitle>① 기 납부한 사용료는 다음의 경우 전액  반환합니다.</SubTitle>
                    <p>1. 천재지변으로 사용이 불가능 할 때</p>
                    <p>2. 운동장 정비 등 공단의 사정으로 인하여 사용을 취소하였을 경우</p>
                    <p>3. 사용일 8일전까지 예약 취소한 경우</p>
                    <p>4. 기상청 특보(호우주의보 이상) 경우 전액환불. 그외 우천시는 취소불가</p>
                </div>

                <div>
                    <SubTitle>② 기 납부한 사용료는 다음의 경우 부분 반환합니다.</SubTitle>
                    <p>1. 사용일 6일부터 7일전까지 예약취소 시 70% 반환</p>
                    <p>2. 사용일 4일부터 5일전까지 예약취소 시 50% 반환</p>
                </div>

                <div>
                    <SubTitle>③ 기 납부한 사용료는 다음의 경우 반환하지 않습니다.</SubTitle>
                    <p>1. 사용일 당일부터 3일전까지 예약취소 시</p>
                    <p>2. 기타 이용지침위반 등 사용자의 귀책사유에 의하여 사용승인이 취소되거나 사용을 중지한 경우</p>
                </div>

            </ContentWrapper>
        </Wrapper>
    )
}

export default RefundPolicy;