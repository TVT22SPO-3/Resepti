import { View, Text } from 'react-native'
import React from 'react'
import { auth } from 'firebase/auth'
import { useAuth, signOut } from '../context/useAuth'
import { getAuth } from 'firebase/auth'

export default function Account() {
 const {user} = useAuth()

  return (
    <View>
      <Text>{user.displayName}</Text>
    </View>
  )
}