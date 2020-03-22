import React from 'react'
import { FlatList } from 'react-native'

// components
import Header from '~/src/components/header'
import Card from './components/card'

// styled
// import { Flatlist } from './styled'

const DATA = []
for (let i = 0; i < 20; i++) {
  let obj = {
    id: `${i}`,
    bank: '中国银行',
    accout: '6666666666666666',
    blance: '90000.00'
  }
  DATA.push(obj)
}

export default props => {
  return (
    <>
      <Header title="卡片管理" />
      <FlatList
        style={{ paddingTop: 20 }}
        horizontal={false}
        data={DATA}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={item => item.id}
      />
    </>
  )
}