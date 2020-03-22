import React from 'react'
import { StatusBar } from 'react-native'

export default props => {
  return <StatusBar backgroundColor="#fff" barStyle="dark-content" {...props} />
}