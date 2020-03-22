import React from 'react'
import { Text } from 'react-native'

// styled
import { Card } from './styled'

export default ({ item, ...props }) => {
  const { bank } = item
  return (
    <Card>
      <Text>{bank}</Text>
    </Card>
  )
}