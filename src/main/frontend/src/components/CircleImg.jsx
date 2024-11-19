// 원형이미지
import styled from "styled-components";

const StyledCircleImg = styled.div`
    border-radius: 50%;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
`

function CircleImg({ src }) {
    return (
        <StyledCircleImg src={src} />
    );
}

export default CircleImg;