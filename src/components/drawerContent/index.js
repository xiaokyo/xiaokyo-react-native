import React from 'react'
import { Wrapper, LogoutBtn, LogoutText, UserInfo } from './styled';
import { useDispatch, useSelector } from 'react-redux'

// actions
import { clearUserInfo } from '~/src/redux/userInfo/actions'

export default props => {

  const { userInfo } = useSelector(state => state)

  return (
    <Wrapper>
      {userInfo.accessToken ? <LoginView {...{ userInfo }} /> : null}
    </Wrapper>
  )
}

const LoginView = ({ userInfo }) => {

  const dispatch = useDispatch()
  const { avatar, username, fan, follow } = userInfo.user

  return (
    <>
      <UserInfo.Wrapper>
        <UserInfo.Avatar source={{ uri: avatar }} />
        <UserInfo.Name>{username}</UserInfo.Name>
      </UserInfo.Wrapper>
      <LogoutBtn onPress={() => clearUserInfo()(dispatch)}>
        <LogoutText>注销登入</LogoutText>
      </LogoutBtn>
    </>
  )
}