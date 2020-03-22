import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import TouchID from 'react-native-touch-id';
import { useNavigation } from '@react-navigation/native';
import { Header, Left, Title } from './styled'

export default ({ title = 'Title', ...props }) => {
  const [isLogin, setIsLogin] = useState(false)
  const nav = useNavigation()

  const authTouchId = () => {
    TouchID.authenticate('to demo this react-native component', {})
      .then(success => {
        // Success code
        setIsLogin(true)
      })
      .catch(error => {
        // Failure code
      });
  }

  return (
    <Header>
      <Left>
        {
          isLogin ?
            <TouchableOpacity onPress={() => nav.toggleDrawer()}>
              <Text style={{ fontSize: 16 }}>菜单</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => authTouchId()}>
              <Text style={{ fontSize: 16 }}>登入</Text>
            </TouchableOpacity>
        }
      </Left>
      <Title>{title}</Title>
    </Header>
  )
}
