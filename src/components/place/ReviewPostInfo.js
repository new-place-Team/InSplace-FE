import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Image, Text } from '../../elements';
import { getReviewPostInfo } from '../../shared/api/placeApi';

const ReviewPostInfo = props => {
  const { postId } = props;
  const [postInfo, setPostInfo] = useState({
    postId,
    category: '',
    postImage: '',
    title: '',
  });

  useEffect(() => {
    // 포스트 정보는 리덕스에 저장할 필요가 없어서 호출만함
    const onLoad = async () => {
      try {
        const res = await getReviewPostInfo(postId);
        setPostInfo(res.data.post);
      } catch (e) {
        console.log(e);
      }
    };
    onLoad();
  }, []);

  return (
    <>
      <TopGrid>
        <Image width="64px" height="64px" src={postInfo.postImage} />
        <Grid flex margin="0 0 0 20px">
          <Text fontSize="13px" color="#A3A6AA">
            {postInfo.category}
          </Text>
          <Text type="Title16">{postInfo.title}</Text>
        </Grid>
      </TopGrid>
      <Background />
    </>
  );
};
const Background = styled.div`
  width: 100%;
  height: 16px;
  background-color: #efefef;
`;
const TopGrid = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

export default React.memo(ReviewPostInfo);
