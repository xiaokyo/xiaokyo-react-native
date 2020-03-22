import styled from 'styled-components'

export const Card = styled.View`
  background-color:#fff;
  padding:10px;
  width:95%;
  margin:0 2.5%;
  height:auto;
  min-height:100px;
  box-shadow:0 0 4px #ccc;
  border-radius:10px;
  margin-top:15px;
  flex-direction:column;
`

export const Title = styled.Text`
  font-size:16px;
  color:#666;
`

export const Description = styled.Text`
  color:#999;
  margin-top:10px;
`

// User
export const User = styled.TouchableOpacity`
  margin-top:10px;
`
export const Username = styled.Text`
  color:#999;
  font-size:12px;
`