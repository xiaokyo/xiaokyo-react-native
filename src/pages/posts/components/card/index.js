import React from 'react'
import { cleanHtmlTag } from '~/src/utils'
// import { Text } from 'react-native'

// styled
import { Card, Title, Description, User, Username } from './styled'

export default ({ item, ...props }) => {
  const { title, description, user: { username } } = item
  return (
    <Card>
      <Title>{title}</Title>
      <Description>{cleanHtmlTag(description)}</Description>
      <User><Username>{username}</Username></User>

    </Card>
  )
}