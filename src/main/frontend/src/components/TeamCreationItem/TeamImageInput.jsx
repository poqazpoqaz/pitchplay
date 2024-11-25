import FileUpload from "../ImgUpload/FileUpload";
import TitleText from "../TitleText";
import styled from "styled-components";
import Button from '../Button';

const StyledDiv1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledP = styled.p`
    margin-bottom: 20px;
`;

const StyledDiv2 = styled.div`
    display: flex;
    justify-content: space-between;
`;


function TeamImageInput({handleBeforeButtonClick, handleNextButtonClick, image, setImage}) {

    return (
        <StyledDiv1>
            <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
                <TitleText size="large">팀 이미지</TitleText>
            </div>
            <div>
                <StyledP>팀 이미지 사진을 첨부해주세요.</StyledP>
                <FileUpload image={image} setImage={setImage}/>
            </div>
            <StyledDiv2>
                <Button color="var(--main-color)" size="large" onClick={handleBeforeButtonClick}>이전</Button>
                <Button color="var(--main-color)" size="large" onClick={handleNextButtonClick}>다음</Button>
            </StyledDiv2>
        </StyledDiv1>
    );
}

export default TeamImageInput;