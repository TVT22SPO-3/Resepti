import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../context/useAuth'
import { useState, useEffect } from 'react'
import { Avatar, Button, TextInput, Card, IconButton, Icon } from 'react-native-paper'
import { getProfile, getByUsername } from '../functions/getProfile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Profileinfo() {

  const { user } = useAuth()
  const [profileData, setprofileData] = useState([])
  const profile = 'profile'
  const id = user.uid
  const [edit, setEdit] = useState("")
  const [editOn, setEditOn] = useState(false)

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

  IconPress = () => {
    setEditOn(false)
    console.log(editOn)
  }

  IconPress2 = () => {
    setEditOn(true)
    console.log("IconPress2", editOn)
  }






  return (
    <View style={styles.container}>
      <Card style={styles.profileCard}>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            mode='outlined'
            placeholder={profileData.username}
            editable={false} />
        </View>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            mode='outlined'
            placeholder={profileData.fname}
            editable={false} />
        </View>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            mode='outlined'
            placeholder={profileData.lname}
            editable={false} />
        </View>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            mode='outlined'
            placeholder={user.email}
            editable={false} />
        </View>
      </Card >

    <Card style={styles.profileCard}>
      <View style={styles.container2}>
        {editOn ? (
          <TextInput
            style={styles.input}
            mode='outlined'
            placeholder={profileData.username}
            editable={false} />
        ) : (
          <TextInput
            style={styles.input}
            mode='outlined'
            placeholder={profileData.username}
            editable={true} />
        )}
        {editOn ? (
          <IconButton icon='account-edit' mode='outlined' size={44} onPress={IconPress} />) : (
          <IconButton icon='account-edit' mode='contained-tonal' size={44} onPress={IconPress2} />)
        }
      </View>
    </Card>

    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faebd7',
  },
  texti: {
    textAlign: 'left',
    fontSize: 16,
    backgroundColor: '#faebd7',
    marginTop: 24,
    marginLeft: 32
  },
  profileCard: {
    paddingTop: 12,
    margin: (24, 24, 24, 24),
    backgroundColor: '#faebd7',
    height: 200,
    borderRadius: 12
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16
  },
  input: {
    width: 240,
    height: 44
  }
});

