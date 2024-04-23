import { View, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/useAuth'
import { updateEmail, updatePassword } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { Avatar, Button, TextInput, Card, IconButton, Icon } from 'react-native-paper'
import { getProfile, getByUsername, updateFname } from '../../functions/getProfile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firestore } from '../../firebase/config'
import { doc, updateDoc, getDoc, where, collection } from '../../firebase/config';
import { querySnapshot, onSnapshot, query } from 'firebase/firestore';
import Styles from '../../Styles'
import { useTheme } from '../../context/useTheme'


export default function ChangePassword() {

        const { user } = useAuth()
        const [showpw, setShowpw] = useState(true)
        const [isOpen, setIsOpen] = useState(false)
        const [newPassword, setNewPassword] = useState("")
        const [newPassword2, setNewPassword2] = useState("")
        const {isDarkMode} = useTheme()
        const toggleAccordion = () => {
          setIsOpen(!isOpen)
        }
    
        const updatePW = async () => {
          console.log("pw", newPassword, ":", newPassword2)
          if (newPassword == newPassword2) {
            updatePassword(user, newPassword).then(() => {
              console.log("password updated")
            }).catch((error) => {
              console.log(error)
            })
          }
        }
    
        const show = () => {
          setShowpw(prevShowpw => !prevShowpw)
          console.log(showpw)
        }
    
        return (
          <View style={[styles.containeri,isDarkMode ? Styles.dark : Styles.light]}>
    
    
            <Card style={[styles.container3,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
              <Pressable onPress={toggleAccordion}>
                <View style={styles.infoContainer}>
                  <Text style={[styles.texti2,isDarkMode ? Styles.darkCard : Styles.lightCard]}>CHANGE PASSWORD</Text>
    
                  <MaterialCommunityIcons
                    name='arrow-down-thick'
                    size={24}
                  />
                </View>
              </Pressable>
              {isOpen && (
                <View>
                  <View style={[styles.container4,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                    <View style={[styles.container5,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                      <MaterialCommunityIcons
                        color={'#FFA500'}
                        name="key"
                        size={32}
                      />
                    </View>
    
                    <View style={[styles.iconContainer,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                      {showpw ?
                        <TextInput
                          style={[styles.input,isDarkMode ? Styles.darkCard : Styles.lightCard]}
                          //mode='outlined'
                          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
                          placeholder={"New password"}
                          editable={true}
                          secureTextEntry={true}
                          onChangeText={text => setNewPassword(text)}
                        /> :
                        <TextInput
                          style={[styles.input,isDarkMode ? Styles.darkCard : Styles.lightCard]}
                          //mode='outlined'
                          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
                          placeholder={"New password"}
                          editable={true}
                          secureTextEntry={false}
                          onChangeText={text => setNewPassword(text)}
                        />
                      }
                    </View>
    
                    <View style={[styles.container5,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                      <TouchableOpacity
                        onPress={show}>
                        <MaterialCommunityIcons color={'#FFA500'} name="eye" size={24} style={[isDarkMode ? Styles.darkButtonText : Styles.lightButtonText]} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.container4,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                    <View style={[styles.container5,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                      <MaterialCommunityIcons
                      color={'#FFA500'}
                        name="key"
                        size={32}
                      />
                    </View>
    
                    <View style={[styles.iconContainer,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                      {showpw ?
                        <TextInput
                          style={[styles.input,isDarkMode ? Styles.darkCard : Styles.lightCard]}
                          //mode='outlined'
                          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
                          placeholder={"Confirm new password"}
                          editable={true}
                          secureTextEntry={true}
                          onChangeText={text => setNewPassword2(text)}
                        /> :
                        <TextInput
                          style={[styles.input,isDarkMode ? Styles.darkCard : Styles.lightCard]}
                          //mode='outlined'
                          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
                          placeholder={"Confirm new password"}
                          editable={true}
                          secureTextEntry={false}
                          onChangeText={text => setNewPassword2(text)}
                        />
                      }
                    </View>
    
                    <TouchableOpacity style={styles.container5}>
                      <Text
                        style={[isDarkMode ? Styles.darkButtonText : Styles.lightButtonText]}
                        onPress={updatePW}
                      >
                        EDIT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
    
              )}
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
          flexDirection: 'row',
          marginBottom: 12,
        },
        container5: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        iconContainer: {
          flex: 4
        },
        containeri:{
          marginTop:12,
        }
      });
      