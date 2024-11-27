import styled from "styled-components";
import { motion } from "framer-motion";

// StyledDiv1 스타일을 추가하여 좀 더 멋지게 만듦
const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  border-radius: 10px;
  margin: 0 auto;

  p {
    font-size: 1.2rem;
  }

  p:nth-child(1) {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--main-color); 
  }

  p:nth-child(2){
    font-size: 1.2rem;
    font-weight: normal;
  }

`;

const StyledDiv2 = styled.div`
    display: flex;
    flex-direction: column;
    margin: 50px;
    gap: 20px;
`;

function TeamCreationEnd() {
    return (
        <Wrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <StyledDiv2>
                <p>축하합니다.</p>
                <p>팀 생성이 완료되었습니다.</p>
            </StyledDiv2>
        </Wrapper>
    );
}

export default TeamCreationEnd;