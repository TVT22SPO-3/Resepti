import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { firestore } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/useAuth';


export default function Register() {

  const { setUser } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [username, setUsername] = useState("")
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  
  const navigation = useNavigation()

  const submit = async () => {
    if (password === password2 && email.length > 5) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user)
          console.log('Account created successfully')
          updateProfile(userCredential.user,{
            displayName: username
          })
          setUser(userCredential.user)
          console.log("register",userCredential.user)
          setDoc(doc(firestore, "users", userCredential.user.uid), {
            fname: fname,
            lname: lname,
            email: email
          })
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] })

        })
        .catch((error) => {
          console.log(error)
          if (error.code === 'auth/email-already-in-use') {
            console.log('Email already in use!')

          }
          if (error.code === 'auth/invalid') {
            console.log('Invalid email!')
          }
          if (error.code === 'auth/weak-password') {
            console.log('Password weak')
          }
          if (error.code === 'auth/invalid-email') {
            console.log('Invalid email')
          }

        });
    } else {
      console.log('Check email and passwords!')
    }
  }

  return (
    <View>
      <Text style={styles.header}>Create account!</Text>

      <TextInput
        
        style={styles.input}
        label="Username"
        value={username}
        mode='outlined'
        secureTextEntry={false}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        mode='outlined'
        inputMode='email'
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        mode='outlined'
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        label="Confirm password"
        value={password2}
        mode='outlined'
        secureTextEntry={true}
        onChangeText={text => setPassword2(text)}
      />
      <TextInput
        style={styles.input}
        label="Firstname"
        value={fname}
        mode='outlined'
        secureTextEntry={false}
        onChangeText={text => setFname(text)}
      />
      <TextInput
        style={styles.input}
        label="Lastname"
        value={lname}
        mode='outlined'
        secureTextEntry={false}
        onChangeText={text => setLname(text)}
      />
      <Button
        onPress={submit}
      >Submit</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    paddingTop: 24,
    paddingBottom: 24,
    marginHorizontal: 12,
    textAlign: 'center'
  },
  input: {
    marginHorizontal: 12,
    marginVertical: 12,
  }
});