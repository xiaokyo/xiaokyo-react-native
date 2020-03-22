import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import StatusBar from '~/src/components/statusBar'
import LinearGradient from 'react-native-linear-gradient'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Wrapper, Logo, TextInput, Hr, TouchableOpacity, LoginButton, SubmitImage, Footer, FootText, FootButton } from './styled'
import { showToast, to } from '~/src/utils'
import storage from '~/src/utils/storage'

import Loading from '~/src/components/loading'

export default props => {
  const { push, navigate } = useNavigation()
  const { params, handleChange, submit, error, loginLoading } = useLoginForm({ navigate })

  return (
    <Wrapper>
      <StatusBar />
      <Logo source={require('~/src/assets/logo.png')} />
      <TextInput maxLength={20} keyboardType="email-address" value={params.username} placeholder='用户名/邮箱' onChangeText={value => handleChange({ key: 'username', value })} />
      <Hr />
      <TextInput maxLength={20} secureTextEntry={true} value={params.password} placeholder='密码' onChangeText={value => handleChange({ key: 'password', value })} />
      <Hr />
      <Hr />
      <TouchableOpacity activeOpacity={error ? 1 : 0.4} onPress={() => !error && submit()}>
        <LoginButton style={{ opacity: error ? 0.4 : 1 }}>
          <LinearGradient colors={["#ecccac", "#e3a86c"]} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
              loginLoading ? <Loading /> : <SubmitImage source={require('~/src/assets/sign.png')} />
            }
          </LinearGradient>
        </LoginButton>
      </TouchableOpacity>

      <Footer>
        {/* <FootButton onPress={() => console.log('忘记密码')}>
          <FootText border>忘记密码</FootText>
        </FootButton> */}

        <FootButton onPress={() => console.log('注册')} onPress={() => navigate('Register')}>
          <FootText>没有账号？去注册</FootText>
        </FootButton>
      </Footer>
    </Wrapper>
  )
}


const TODO_LOGIN = gql`
  mutation Login($email:String!,$password:String!){
    login(
      email:$email,
      password:$password
    ){
      accessToken
      code
      user{
        _id
        username
        avatar
        fan
        follow
        email
      }
    }
  }
`

const useLoginForm = ({ navigate }) => {
  const [params, setParams] = useState({
    username: '',
    password: '',
  })

  const [login, { data, loading: loginLoading }] = useMutation(TODO_LOGIN)
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

  const submit = async () => {
    if (loginLoading) return
    console.log(params)
    const { username: email, password } = params
    const [err, res] = await to(login({ variables: { email, password } }))
    if (err) return showToast('服务器错误')
    console.log('登录返回', res)
    if (res.data.login.code === 0) return showToast('用户名密码错误')
    const { accessToken, user } = res.data.login
    showToast('登录成功')
    storage.set('token', accessToken)
    storage.set('userInfo', JSON.stringify(user))
    navigate('Home')
  }

  return { params, handleChange, submit, error, loginLoading }
}