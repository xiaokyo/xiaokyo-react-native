import React, { useState, useEffect } from 'react'
import { ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import StatusBar from '~/src/components/statusBar'
import LinearGradient from 'react-native-linear-gradient'
import { Wrapper, Title, TextInput, Hr, TouchableOpacity, LoginButton, SubmitImage, Footer, FootText, OpacityBtn, CodeView, CodeText, CodeInput } from './styled'

const showToast = text => ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);

const EMAIL = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

export default props => {
  const { pop } = useNavigation()
  const { params, handleChange, submit, isTimerOpen, sendCode, countDown } = useRegisterForm()

  return (
    <Wrapper>
      <StatusBar />
      <Hr />
      <Hr />
      <Title>注册</Title>
      <Hr />
      <Hr />
      <TextInput maxLength={20} keyboardType="email-address" value={params.username} placeholder='用户名' onChangeText={value => handleChange({ key: 'username', value })} />
      <Hr />
      <TextInput maxLength={20} keyboardType="email-address" value={params.email} placeholder='邮箱' onChangeText={value => handleChange({ key: 'email', value })} />
      <Hr />
      <CodeView>
        <CodeInput maxLength={4} keyboardType="number-pad" value={params.code} placeholder='验证码' onChangeText={value => handleChange({ key: 'code', value })} />
        <OpacityBtn onPress={sendCode}>
          <CodeText>{!isTimerOpen ? '发送验证码' : countDown}</CodeText>
        </OpacityBtn>
      </CodeView>
      <Hr />
      <TextInput maxLength={20} secureTextEntry={true} value={params.password} placeholder='密码' onChangeText={value => handleChange({ key: 'password', value })} />
      <Hr />
      <TextInput maxLength={20} secureTextEntry={true} value={params.confirmPass} placeholder='确认密码' onChangeText={value => handleChange({ key: 'confirmPass', value })} />
      <Hr />
      <Hr />
      <TouchableOpacity onPress={() => submit()}>
        <LoginButton>
          <LinearGradient colors={["#ecccac", "#e3a86c"]} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SubmitImage source={require('~/src/assets/sign.png')} />
          </LinearGradient>
        </LoginButton>
      </TouchableOpacity>

      <Footer>
        {/* <OpacityBtn onPress={() => console.log('忘记密码')}>
          <FootText border>忘记密码</FootText>
        </OpacityBtn> */}

        <OpacityBtn onPress={() => console.log('注册')} onPress={() => pop()}>
          <FootText>有账号？去登录</FootText>
        </OpacityBtn>
      </Footer>
    </Wrapper>
  )
}


let inter = null
const useRegisterForm = () => {
  const [params, setParams] = useState({
    username: '',
    email: '',
    code: '',
    password: '',
    confirmPass: ''
  })
  const [error, setError] = useState('')

  const [countDown, setCountDown] = useState(60)
  const [isTimerOpen, setIsTimerOpen] = useState(false)

  const sendCode = () => {// 发送验证码的倒计时
    if (isTimerOpen) return
    const { email } = params
    if (!email || !EMAIL.test(email)) return showToast('请确认邮箱')
    setIsTimerOpen(true)
    let _countDown = countDown
    inter = setInterval(() => {
      if (_countDown <= 1) {
        clearInterval(inter)
        setIsTimerOpen(false)
        setCountDown(countDown)
        return
      }
      _countDown -= 1
      setCountDown(_countDown)
    }, 1000)
  }

  useEffect(() => {
    return clearInterval(inter)
  }, [])

  const handleChange = ({ key, value }) => {
    setParams({ ...params, [key]: value })
    checkField()
    // console.log(params, error)
  }

  useEffect(() => {// 当参数填写有改变，校验错误情况
    const error = checkField()
    setError(error)
  }, [params])

  // 校验账号密码
  const checkField = () => {
    const { username, password, confirmPass, email, code } = params
    if (!username) return '请输入用户名'
    if (!email || !EMAIL.test(email)) return '请确认邮箱'
    if (!password || password !== confirmPass) return '请确认密码'
    if (password.length <= 5) return '密码强度过低'
    if (!code || code.length < 4) return '请确认验证码'
    return ''
  }

  // 提交注册
  const submit = () => {
    if (error) return showToast(error)
    console.log(params)
  }

  return { params, handleChange, submit, error, isTimerOpen, sendCode, countDown }
}