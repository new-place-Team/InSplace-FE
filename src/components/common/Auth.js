import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Auth = (SpecificComponent, option) => {
  const isLogin = useSelector(state => state.user.isLogin);
  const AuthenticationCheck = props => {
    useEffect(() => {
      console.log(props.history);
      if (!isLogin) {
        if (option) {
          props.history.replace('/login');
        }
      } else if (option === false) {
        props.history.push('/');
      }
    }, []);
    return <SpecificComponent />;
  };
  return AuthenticationCheck;
};

export default Auth;
