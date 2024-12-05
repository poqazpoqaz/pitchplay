import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px;
  background-color: #f9fafc;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  margin-bottom: 25px;
`;

const Box = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding: 20px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 카드형 그림자 */
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px); /* 호버 시 살짝 떠오르는 효과 */
  }

  h1 {
    font-size: 18px;
    color: #555;
    margin: 0;
  }
`;


const CommentList = ({ comments = [] }) => {


  // 10개 항목만 가져오고, 없으면 빈 데이터로 채움
  const filledComments = comments.length > 0
  ? comments.slice(0, 10)  // 댓글이 있으면 최대 10개까지만 가져옴
  : Array.from({ length: 3 }, () => ({ userNickname: '', comment: '' })); // 댓글이 없으면 빈 객체 3개 생성


  return (
    <Container>
      <Title>내 댓글</Title>
      {filledComments.map((comment, index) => (
         <Box key={index}>
         <div>
           <h1>{comment?.userNickname || '닉네임 정보 없음'}</h1>
           <p>{comment?.comment || '댓글 내용 없음'}</p>
         </div>
       </Box>
      ))}
    </Container>
  );
};

export default CommentList;
