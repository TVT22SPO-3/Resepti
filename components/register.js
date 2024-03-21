import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Button, TextInput } from 'react-native-paper'

export default function Register() {
    
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [fname, setFname] = useState("")
    const [pw, setPw] = useState("")
    const [pw2, setPw2] = useState("")
    const [showError, setShowError] = useState(false)

    const submit = () =>{
        checkpw()
        if (showError === false){
          console.log("jEE!")
        } else {
          console.log("ei jee!")
        }
    }

    const checkpw = () => {
        if (pw === pw2){
            setShowError(false)
        } else {
            setShowError(true)
        }
    }

  return (
    <View>
      <Text style={styles.header}>Create account!</Text>
      <TextInput
      style={styles.input}
      label="Username"
      value={user}
      mode='outlined'
      onChangeText={text => setUser(text)}
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
      label="Firstname"
      value={fname}
      mode='outlined'
      onChangeText={text => setFname(text)}
      />
      <TextInput
      style={styles.input}
      label="Password"
      value={pw}
      mode='outlined'
      secureTextEntry={true}
      onChangeText={text => setPw(text)}
      />
      <TextInput
      style={styles.input}
      label="Confirm password"
      value={pw2}
      mode='outlined'
      secureTextEntry={true}
      onChangeText={text => setPw2(text)}
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
  header:{
    fontSize: 36,
    paddingTop: 24,
    paddingBottom: 24,
    marginHorizontal: 12,
    textAlign: 'center'
  },
  input:{
    marginHorizontal: 12,
    marginVertical: 12,
  }
});