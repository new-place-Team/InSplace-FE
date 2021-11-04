<<<<<<< HEAD
import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Text, Image } from '../../elements/index';
import { good } from '../../images/index';

const ReviewCard = () => {
  return (
    <ReviewCardWrap>
      {/* 유저 프로필 */}
      <Grid justify="space-between">
        <Grid isFlex>
          <Grid>
            <Image
              type="circle"
              width="40px"
              height="40px"
              src="https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg"
            />
          </Grid>
          <Grid margin="0 0 0 12px">
            <Text fontSize="14px" color="#3E4042">
              아이유
            </Text>
            <Text fontSize="12px" color="#A3A6AA" letterSpacing="0.0008em">
              여자 <Line /> ESFP
            </Text>
          </Grid>
        </Grid>
        <Text fontSize="13px" color="#A3A6AA" letterSpacing="-0.0008em">
          21.11.02
        </Text>
      </Grid>
      <Grid justify="space-between" margin="27px 0 0 0">
        <Grid isFlex width="50%">
          <Text
            margin="0 20px 0 0"
            fontSize="14px"
            color="#3E4042"
            letterSpacing="-0.0008em"
          >
            날씨
          </Text>
          <Text fontSize="14px" color="#7A7D81" letterSpacing="-0.0008em">
            맑음
          </Text>
        </Grid>
        <Grid isFlex width="50%">
          <Text
            margin="0 20px 0 0"
            fontSize="14px"
            color="#3E4042"
            letterSpacing="-0.0008em"
          >
            날짜
          </Text>
          <Text fontSize="14px" color="#7A7D81" letterSpacing="-0.0008em">
            주말
          </Text>
        </Grid>
      </Grid>
      <Grid isFlex width="50%">
        <Text
          margin="0 20px 0 0"
          fontSize="14px"
          color="#3E4042"
          letterSpacing="-0.0008em"
        >
          재방문의사
        </Text>
        <Text fontSize="14px" color="#7A7D81" letterSpacing="-0.0008em">
          <Image width="16px" src={good} />
        </Text>
        <Text
          margin="16px 0 24px 0"
          fontSize="14px"
          color="#3E4042"
          letterSpacing="-0.0008em"
        >
          자리도 넓고 조용해서 좋았어요! 공부하기 딱 좋습니다! 다음에도 또
          방문할게요ㅎㅎㅎ
        </Text>
        <Grid isFlex>
          <Button
            margin="0 12px 0 0"
            padding="6px 16px"
            border="1px solid #282828"
          >
            <Text fontSize="14px" color="#282828">
              도움이돼요
            </Text>
          </Button>
          <Text fontSize="13px" color="#3E4042">
            12명에게 도움이 되었습니다
          </Text>
        </Grid>
      </Grid>
    </ReviewCardWrap>
  );
};
const ReviewCardWrap = styled.div`
  padding: 24px 22px;
  border-top: 1px solid #e6e9ec;
`;
const Line = styled.span`
  &::after {
    display: inline-block;
    content: '|';
    color: #c4c4c4;
    margin: 0 5px;
  }
`;

export default ReviewCard;
=======
import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Text, Image } from '../../elements/index';
import { good } from '../../images/index';

const ReviewCard = () => {
  return (
    <ReviewCardWrap>
      {/* 유저 프로필 */}
      <Grid justify="space-between">
        <Grid isFlex>
          <Grid>
            <Image
              type="circle"
              width="40px"
              height="40px"
              src="https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg"
            />
          </Grid>
          <Grid margin="0 0 0 12px">
            <Text fontSize="14px" color="#3E4042">
              아이유
            </Text>
            <Text fontSize="12px" color="#A3A6AA" letterSpacing="0.0008em">
              여자 <Line /> ESFP
            </Text>
          </Grid>
        </Grid>
        <Text fontSize="13px" color="#A3A6AA" letterSpacing="-0.0008em">
          21.11.02
        </Text>
      </Grid>
      <Grid justify="space-between" margin="27px 0 0 0">
        <Grid isFlex width="50%">
          <Text
            margin="0 20px 0 0"
            fontSize="14px"
            color="#3E4042"
            letterSpacing="-0.0008em"
          >
            날씨
          </Text>
          <Text fontSize="14px" color="#7A7D81" letterSpacing="-0.0008em">
            맑음
          </Text>
        </Grid>
        <Grid isFlex width="50%">
          <Text
            margin="0 20px 0 0"
            fontSize="14px"
            color="#3E4042"
            letterSpacing="-0.0008em"
          >
            날짜
          </Text>
          <Text fontSize="14px" color="#7A7D81" letterSpacing="-0.0008em">
            주말
          </Text>
        </Grid>
      </Grid>
      <Grid isFlex width="50%">
        <Text
          margin="0 20px 0 0"
          fontSize="14px"
          color="#3E4042"
          letterSpacing="-0.0008em"
        >
          재방문의사
        </Text>
        <Text fontSize="14px" color="#7A7D81" letterSpacing="-0.0008em">
          <Image width="16px" src={good} />
        </Text>
        <Text
          margin="16px 0 24px 0"
          fontSize="14px"
          color="#3E4042"
          letterSpacing="-0.0008em"
        >
          자리도 넓고 조용해서 좋았어요! 공부하기 딱 좋습니다! 다음에도 또
          방문할게요ㅎㅎㅎ
        </Text>
        <Grid isFlex>
          <Button
            margin="0 12px 0 0"
            padding="6px 16px"
            border="1px solid #282828"
          >
            <Text fontSize="14px" color="#282828">
              도움이돼요
            </Text>
          </Button>
          <Text fontSize="13px" color="#3E4042">
            12명에게 도움이 되었습니다
          </Text>
        </Grid>
      </Grid>
    </ReviewCardWrap>
  );
};
const ReviewCardWrap = styled.div`
  padding: 24px 22px;
  border-top: 1px solid #e6e9ec;
`;
const Line = styled.span`
  &::after {
    display: inline-block;
    content: '|';
    color: #c4c4c4;
    margin: 0 5px;
  }
`;

export default ReviewCard;
>>>>>>> feature/kakaoLogin
