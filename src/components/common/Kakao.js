import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { kakaoLogin } from '../../redux/async/user';
import { Text, Image } from '../../elements';

const Kakao = () => {
  const dispatch = useDispatch();
  // 리다이렉트 페이지에서 인가 코드만을 추출
  const code = new URL(window.location.href).searchParams.get('code');
  // 추출한 인가코드를 백엔드 서버에 전달
  React.useEffect(async () => {
    await dispatch(kakaoLogin(code));
  }, []);
  return (
    <>
      <Div>
        <Text textAlign="center" margin="0 0 20px 0">
          <strong>카카오 로그인 중 입니다.</strong>
        </Text>
        <Image
          width="50%"
          src="https://item.kakaocdn.net/do/4be9625c0426fb7d21c0bff1e8af2e1df43ad912ad8dd55b04db6a64cddaf76d"
        />
      </Div>
    </>
  );
};

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export default Kakao;
