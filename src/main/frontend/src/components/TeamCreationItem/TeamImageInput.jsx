import FileUpload from "../ImgUpload/FileUpload";
import TitleText from "../TitleText";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Description = styled.p`
    margin-bottom: 20px;
`;


function TeamImageInput({teamImg, setTeamImg}) {

    return (
        <Wrapper>
            <div style={{ borderBottom: "2px solid var(--main-color)", paddingBottom: "10px" }}>
                <TitleText size="large">팀 이미지</TitleText>
            </div>
            <div>
                <Description>팀 이미지 사진을 첨부해주세요.</Description>
                <FileUpload image={teamImg} setImage={setTeamImg}/>
            </div>
        </Wrapper>
    );
}

export default TeamImageInput;