import { View, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/useAuth'
import { updateEmail, updatePassword } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { Avatar, Button, TextInput, Card, IconButton, Icon } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firestore } from '../../firebase/config'
import { doc, updateDoc, getDoc, where, collection } from '../../firebase/config';
import { querySnapshot, onSnapshot, query, docSnapshot } from 'firebase/firestore';


export default function UserInformationCard() {

    const { user } = useAuth()

    const [newfname, setNewfname] = useState("")
    const [newlname, setNewlname] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    //const [profileData, setprofileData] = useState({})
    const [profileData, setProfileData] = useState({
        fname: '',
        lname: ''
      });

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const fetchProfileData = async () => {
            const docRef = doc(collection(firestore, "profile"), user.uid);
      
            try {
              const docSnapshot = await getDoc(docRef);
              if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setProfileData({
                  fname: data.fname,
                  lname: data.lname
                });
                console.log("Document data:", profileData.fname, profileData);
              } else {
                console.log("Ei löydy");
              }
            } catch (error) {
              console.error("Error:", error);
            }
          };
      
          fetchProfileData();
        }, [])

        /* console.log("UIC",user.uid)
           const q = query(collection(firestore, "profile"), user.uid)
           const unsubscribe = onSnapshot(q, (querySnapshot) => {
             tempData = {}
             querySnapshot.forEach((doc) => {
               const data = doc.data()
               console.log(data)
               tempData.fname = data.fname
               tempData.lname = data.lname
     
             })
             setprofileData(tempData)
           })
     */  
 



    const Fname = async () => {
        const nameRef = doc(firestore, "profile", user.uid)
        try {
            await updateDoc(nameRef, {
                fname: newfname
            })
            console.log("Firstname updated!")

        } catch (error) {
            console.log("Fname update failed", error)
        }

    }

    const Lname = async () => {
        const nameRef = doc(firestore, "profile", user.uid)
        try {
            await updateDoc(nameRef, {
                lname: newlname
            })
            console.log("Lastname updated!")
        } catch (error) {
            console.log("Lname update failed", error)
        }

    }

    const NewEmail = async () => {
        console.log("email", newEmail)
        await updateEmail(user, newEmail).then(() => {
            console.log("EMAIL UPDATED")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Card style={styles.container3}>
            <Pressable onPress={toggleAccordion}>
                <View style={styles.infoContainer}>
                    <Text style={styles.texti2}>INFORMATION</Text>

                    <MaterialCommunityIcons
                        name='arrow-down-thick'
                        size={24}
                    />
                </View>

            </Pressable>


            {isOpen && (
                <View>
                    <View style={styles.container4}>
                        <View style={styles.container5}>
                            <MaterialCommunityIcons
                                name="account"
                                size={32}
                            />
                        </View>

                        <View style={styles.iconContainer}>
                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                outlineColor='#faebd7'
                                backgroundColor='#faebd7'
                                placeholder={profileData.fname}
                                editable={true}
                                onChangeText={text => setNewfname(text)}
                            />
                        </View>

                        <View style={styles.container5}>
                            <Button
                                onPress={Fname}
                            >
                                EDIT
                            </Button>
                        </View>
                    </View>
                    <View style={styles.container4}>
                        <View style={styles.container5}>
                            <MaterialCommunityIcons
                                name="account"
                                size={32}
                            />
                        </View>

                        <View style={styles.iconContainer}>
                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                outlineColor='#faebd7'
                                backgroundColor='#faebd7'
                                placeholder={profileData.lname}
                                editable={true}
                                onChangeText={text => setNewlname(text)}
                            />
                        </View>

                        <View style={styles.container5}>
                            <Button
                                onPress={Lname}>
                                EDIT
                            </Button>
                        </View>
                    </View>

                    <View style={styles.container4}>
                        <View style={styles.container5}>
                            <MaterialCommunityIcons
                                name="email"
                                size={32}
                            />
                        </View>

                        <View style={styles.iconContainer}>
                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                outlineColor='#faebd7'
                                backgroundColor='#faebd7'
                                placeholder={user.email}
                                editable={true}
                                onChangeText={text => setNewEmail(text)} />
                        </View>

                        <View style={styles.container5}>
                            <Button
                                onPress={NewEmail}
                            >
                                EDIT
                            </Button>
                        </View>
                    </View>
                </View>
            )}

        </Card>
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