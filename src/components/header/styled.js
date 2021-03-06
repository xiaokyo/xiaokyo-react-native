import styled from 'styled-components'

export const Header = styled.View`
  width:100%;
  height:60px;
  background-color:#fff;
  box-shadow:0 0 4px #ccc;
  border-color:#f2f2f2;
  border-bottom-width:1px;
  /* justify-content:center; */
  padding:0 20px;
  flex-direction:row;
  align-items:center;
  /* margin-bottom:20px; */
`
export const Left = styled.View`
  font-size:20px;
  padding-right:20px;
  min-width:50px;
`

export const Title = styled.Text`
  font-size:16px;
  flex:1;
  text-align:center;
`

export const Right = styled.View`
  font-size:20px;
  padding-left:20px;
  min-width:50px;
`

// 头像
export const Avatar = styled.Image`
  width:30px;
  height:30px;
  border-radius:50px;
`