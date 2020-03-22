import styled from 'styled-components'

export const Wrapper = styled.View`
  flex-direction:column;
  align-items:center;
  flex:1;
  background-color:#fff;
`

export const Logo = styled.Image`
  width:120px;
  height:120px;
  margin-top:40px;
  margin-bottom:30px;
`

export const Title = styled.Text`
  font-size:24px;
  text-align:center;
  font-weight:bold;
  color:#999;
`

export const CodeView = styled.View`
  width:75%;
  border-radius:50px;
  background-color:#f2f2f2;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  padding-right:20px;
`

export const CodeInput = styled.TextInput`
  height:60px;
  width:65%;
  border-radius:50px;
  background-color:#f2f2f2;
  /* color:#f2f2f2; */
  padding:0 25px;
  font-size:16px;
  overflow:hidden;
`

export const CodeText = styled.Text`
  color:#999;
`


export const TextInput = styled.TextInput`
  height:60px;
  width:75%;
  border-radius:50px;
  background-color:#f2f2f2;
  /* color:#f2f2f2; */
  padding:0 25px;
  font-size:16px;
  overflow:hidden;
`

export const Hr = styled.View`
  height:15px;
`

export const TouchableOpacity = styled.TouchableOpacity`
  width:70px;
  height:70px;
  margin-top:30px;
`

export const LoginButton = styled.View`
  width:100%;
  height:100%;
  /* box-shadow:0 0 20px #ccc; */
  font-size:18px;
  /* background-color:#e3a86c; */
  border-radius:50px;
  justify-content:center;
  align-items:center;
  overflow:hidden;
`

export const SubmitImage = styled.Image`
  width:30px;
  height:30px;
`

export const Footer = styled.View`
  height:30px;
  margin:40px 0;
  flex:1;
  flex-direction:row;
  justify-content:center;
  align-items:flex-end;
`

export const FootText = styled.Text`
  padding:0 10px;
  border-right-width:${props => props.border ? '1px' : '0'};
  border-color:#f2f2f2;
  color:#999;
`

export const OpacityBtn = styled.TouchableOpacity``