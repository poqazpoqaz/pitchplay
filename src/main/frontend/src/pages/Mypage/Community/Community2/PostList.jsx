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
const BoxCal = styled.div`
  font-size: 14px;
  color: #888;
  margin-right: 15px;

  p {
    margin: 0;
    font-weight: bold;
  }
`;


const PostList = ({ posts = [] }) => {


  // 10개 항목만 가져오고, 없으면 빈 데이터로 채움
  const filledPosts = posts.length > 0
  ? posts.slice(0, 10)  // 댓글이 있으면 최대 10개까지만 가져옴
  : Array.from({ length: 3 }, () => ({ writenNickname: '', content: '', date: '', viewCount: 0  })); // 댓글이 없으면 빈 객체 3개 생성


  return (
    <Container> 
      <Title>내 게시글</Title>
      {filledPosts.map((post, index) => (
        <Box key={index}>
        <div>
          <h1>{post?.title || '제목 정보 없음'}</h1>
          <p>{post?.content || '내용 정보 없음'}</p>
        </div>
        <BoxCal>
          <p>{post?.date || '날짜 정보 없음'}</p>
          <p>{`조회수: ${post?.views || 0}`}</p>
        </BoxCal>
      </Box>
      ))}
    </Container>
  );
};

export default PostList;