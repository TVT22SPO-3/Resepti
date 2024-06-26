import { View, StyleSheet, Text, Button, TouchableOpacity, Pressable, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/useAuth'
import { getAuth, reload } from 'firebase/auth';
import { Avatar, TextInput, Card, IconButton, Icon } from 'react-native-paper'
import { Logout } from '../../screens/Login';
import { useNavigation } from '@react-navigation/native';
import Login from '../../screens/Login';
import Stacknav from '../Stacknav';
import BottomNavbar from '../BottomNavbar';
import Styles from '../../Styles';
import { useTheme } from '../../context/useTheme';



export default function UserCard() {
    const {isDarkMode} = useTheme()
    const { user } = useAuth() 
    const navigation = useNavigation();

    return (
      <View>
        <Card style={[styles.container,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
          <View style={styles.container2}>
            {user.photoURL ? (
              <Avatar.Image size={160} source={{ uri: user.photoURL }} />
            ) : (
              <Avatar.Image size={160} source={require('../../assets/trash.png')} />
            )}
            <Text style={[styles.texti,isDarkMode ? Styles.darkCard : Styles.lightCard]}>{user.displayName}</Text>
          </View>
        </Card>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      paddingTop: 24,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      margin: (12, 12, 12, 12),
      backgroundColor: '#faebd7',
    },
    texti: {
      paddingTop: 20,
      fontSize: 24,
      textAlign: 'center',
      paddingBottom: 20,
    },
    container2: {
      alignItems: 'center'
    },
    container3: {
  
      backgroundColor: '#faebd7',
      marginHorizontal: 12,
    },
    texti2: {
      fontSize: 18,
      textAlign: 'center',
      paddingRight: 24
    },
    expandedContainer: {
      height: 200,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 4,
    },
    container4: {
      backgroundColor: '#faebd7',
      flexDirection: 'row'
    },
    container5: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      flex: 4
    }
  });
  