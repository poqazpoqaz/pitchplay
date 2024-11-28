import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Container = styled.div`
  padding: 20px;
  border: 2px dashed black;
`;

const Subtitle = styled.h1`
  margin-bottom: 25px;
`;

const Box = styled.div`
  background-color: #f4f4f4;
  margin-bottom: 10px;
  border-radius: 5px;
  height : 40px;
  font-size : 15px;
  font-weight: bold;
  padding : 10px;

`;


const BtnEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const LinkButton = styled(Link)`
  display: inline-block;
  background-color: #07550C;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #063e09;
  }
`;

const PostsSection = ({ posts = [] }) => {
  return (
    <Container>
      <Subtitle>내가 쓴 글</Subtitle>
      <Box>
        <p>게시물 : {posts[0] || "게시물 내용 없음"}</p>
      </Box>
      <Box>
        <p>댓글 : {posts[1] || "댓글 내용 없음"}</p>
        
      </Box>
      <BtnEnd>
        <LinkButton to="/mypage/posts">보러가기</LinkButton>
      </BtnEnd>
    </Container>
  );
};

export default PostsSection;
