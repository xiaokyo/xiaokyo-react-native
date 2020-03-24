import styled from 'styled-components'

export const Wrapper = styled.View`
  padding:20px;
  background:#fff;
  flex:1;
  flex-direction:column;
`

export const LogoutBtn = styled.TouchableOpacity`

`

export const LogoutText = styled.Text`
  color:#000;
`

export const UserInfo = {
  Wrapper: styled.View`
    padding:20px 0;
    /* align-items:center; */
    flex-direction:row;
  `,
  Avatar: styled.Image`
    width:80px;
    height:80px;
    border-radius:8px;
  `,
  Name: styled.Text`
    font-size:18px;
    margin-left:10px;
  `
}
