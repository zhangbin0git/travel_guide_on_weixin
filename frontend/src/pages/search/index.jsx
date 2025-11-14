import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtIcon, AtTabs, AtTabsPane, AtCard, AtButton, AtToast } from 'taro-ui'
import TopNavBar from '../../components/common/TopNavBar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import { useRouter } from '../../hooks/useRouter'
import './index.scss'

const Search = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [currentTab, setCurrentTab] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState('')

  useEffect(() => {
    // Component did mount logic here
  }, [])

  const onChange = (value) => {
    setSearchValue(value)
    console.log('搜索内容:', value)
  }

  return (
    <View className='search'>
      <View className='container'>
        <Text className='title'>搜索目的地</Text>
        <AtSearchBar
          value={searchValue}
          onChange={onChange}
          placeholder='请输入搜索关键词'
        />
      </View>
    </View>
  )
}

export default Search