import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  border: 2px dashed black;
`;

const Subtitle = styled.h1`
  margin-bottom: 25px;
`;

const Box = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const BoxCal = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
`;

const BtnEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const LinkButton = styled.a`
  display: inline-block;
  background-color: #07550c;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const PostsSection = ({ posts = [] }) => {
  return (
    <Container>
      <Subtitle>내가 쓴 글</Subtitle>
      <Box>
        <p>게시물 :</p>
        <p>{posts[0] || "게시물 내용 없음"}</p>
      </Box>
      <Box>
        <p>댓글 :</p>
        <p>{posts[1] || "댓글 내용 없음"}</p>
      </Box>
      <BtnEnd>
        <LinkButton href="/posts">보러가기</LinkButton>
      </BtnEnd>
    </Container>
  );
};

export default PostsSection;
