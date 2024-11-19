import styled from 'styled-components';

// StyledButton 컴포넌트 정의
    const StyledButton = styled.button`
        background: ${props => props.color ? props.color: '#FFFFFF'};  // color가 없으면 기본 흰색
        color: ${props => props.color ? '#FFFFFF' : '#000000'}; // background color가 있으면 흰색, 없으면 검정색
        font-weight: bold;
        margin: 20px 30px;
        padding: 10px 20px;
        border-radius: 15px;
        border: 2px solid var(--main-color);
    `;

function Button({ color, text }) {
    return (
        // StyledButton에 color와 text를 props로 전달
        <StyledButton color={color}>{text}</StyledButton>
    );
}

export default Button;