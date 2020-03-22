import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
// import TouchID from 'react-native-touch-id';
import { useNavigation } from '@react-navigation/native';
import { Header, Left, Right, Title } from './styled'

export default ({ title = 'Title', ...props }) => {
  const [isLogin, setIsLogin] = useState(false)
  const { toggleDrawer, navigate } = useNavigation()

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

  return (
    <Header>
      <Left>
        {
          isLogin ?
            <TouchableOpacity onPress={() => toggleDrawer()}>
              <Text style={{ fontSize: 16 }}>菜单</Text>
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
