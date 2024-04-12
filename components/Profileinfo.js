import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../context/useAuth'
import { useState, useEffect } from 'react'
import { Avatar, Button, TextInput, Card, IconButton, Icon } from 'react-native-paper'
import { getProfile, getByUsername } from '../functions/getProfile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Profileinfo({data}) {
  const { user } = useAuth()


  useEffect(() => {
    const Profile = async () => {
      try {
        const data = await getProfile(id);
        setprofileData(data);
      } catch (error) {
        console.log("profilePage1", error);
      }
    }

    Profile();
  }, []);






  return (

    <Card style={styles.container}>
      <View style={styles.container2}>
      <Avatar.Image size={160} source={require('../assets/trash.png')} />
      <Text style={styles.texti}></Text>
      </View>
    </Card>

  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: (24, 24, 24, 24),
    backgroundColor: '#faebd7',
  },
  texti: {
    paddingTop: 20,
    fontSize: 44,
    textAlign: 'center',
    paddingBottom: 20,
  },

  container2: {
    alignItems: 'center'
  }
});

