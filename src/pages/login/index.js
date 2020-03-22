import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Wrapper, Logo, TextInput, Hr, TouchableOpacity, LoginButton, SubmitImage, Footer, FootText, FootButton } from './styled'

export default props => {

  const { params, handleChange, submit, error } = useLoginForm()

  return (
    <Wrapper>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Logo source={require('../../assets/logo.png')} />
      <TextInput maxLength={20} keyboardType="email-address" value={params.username} placeholder='用户名/邮箱/手机号' onChangeText={value => handleChange({ key: 'username', value })} />
      <Hr />
      <TextInput maxLength={20} secureTextEntry={true} value={params.password} placeholder='密码' onChangeText={value => handleChange({ key: 'password', value })} />
      <Hr />
      <Hr />
      <TouchableOpacity activeOpacity={error ? 1 : 0.4} onPress={() => !error && submit()}>
        <LoginButton style={{ opacity: error ? 0.4 : 1 }}>
          <LinearGradient colors={["#ecccac", "#e3a86c"]} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SubmitImage source={require('./images/sign.png')} />
          </LinearGradient>
        </LoginButton>
      </TouchableOpacity>

      <Footer>
        <FootButton onPress={() => console.log('忘记密码')}>
          <FootText border>忘记密码</FootText>
        </FootButton>

        <FootButton onPress={() => console.log('注册')}>
          <FootText>没有账号？去注册</FootText>
        </FootButton>
      </Footer>
    </Wrapper>
  )
}

const useLoginForm = () => {
  const [params, setParams] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState(true)

  const handleChange = ({ key, value }) => {
    setParams({ ...params, [key]: value })
    checkField()
    // console.log(params, error)
  }

  useEffect(() => {
    checkField()
  }, [params])

  // 校验账号密码
  const checkField = () => {
    let flag = false
    if (!params.username) flag = true
    if (!params.password || params.password.length <= 0) flag = true
    setError(flag)
  }

  const submit = () => {
    console.log(params)
  }

  return { params, handleChange, submit, error }
}