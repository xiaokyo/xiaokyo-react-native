import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Wrapper } from './styled'

export default props => {
  return (
    <Wrapper>
      <ActivityIndicator {...props} />
    </Wrapper>
  )
}