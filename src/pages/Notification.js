import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import { Grid, Text, Container } from '../elements';
import { heartFilled, pin, polygon } from '../images/index';

const Notification = () => {
  return (
    <>
      <Header _back _content="공지사항" />
      <Container>
        <Div>
          <Text fontSize="14px" margin="0 0 8px 0" bold>
            ios/ 안드로이드 홈 추가방법
          </Text>
          <Text fontSize="12px">2021.10.26</Text>
        </Div>
      </Container>
    </>
  );
};

const Div = styled.div`
  width: 100%;
  height: 5rem;
  font-size: 16px;
  border-bottom: 1px solid #c4c4c4;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export default Notification;
