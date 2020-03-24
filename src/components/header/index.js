import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useSelector } from 'react-redux'
// import TouchID from 'react-native-touch-id';
import { useNavigation } from '@react-navigation/native';
import { Header, Left, Right, Title, Avatar } from './styled'

export default ({ title = 'Title', ...props }) => {
  const { toggleDrawer, navigate } = useNavigation()
  const { userInfo } = useSelector(state => state)
  console.log('userInfo', userInfo)
  // const authTouchId = () => {
  //   TouchID.authenticate('指纹验证后登录账号', {title:'验证指纹'})
  //     .then(success => {
  //       // Success code
  //       setIsLogin(true)
  //     })
  //     .catch(error => {
  //       // Failure code
  //     });
  // }
  console.log('avatar', userInfo.user.avatar)

  return (
    <Header>
      <Left>
        {
          userInfo.accessToken ?
            <TouchableOpacity onPress={() => toggleDrawer()}>
              <Avatar source={{ uri: userInfo.user.avatar }} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => navigate('Login')}>
              <Text style={{ fontSize: 16 }}>登入</Text>
            </TouchableOpacity>
        }
      </Left>
      <Title>{title}</Title>
      <Right />
    </Header>
  )
}
