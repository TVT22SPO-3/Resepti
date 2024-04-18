import { View, ScrollView, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button, Icon, TextInput } from 'react-native-paper'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firestore, setDoc, addDoc, collection, doc, profile, serverTimestamp, storage, ref, uploadBytes, getDownloadURL } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/useAuth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RequestStoragePermission from '../Permissions';
import * as ImagePicker from 'expo-image-picker';


export default function Register() {

  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation();

  const handleImageChange = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const submit = async () => {
    if (password === password2 && email.length > 5) {
      const auth = getAuth();


      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const uniqueId = () => {
        return Math.random().toString(36).substr(2, 9);
      };
      const uniqueFileName = `${Date.now()}_${uniqueId()}.jpg`;


      await createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          console.log(userCredential.user);
          console.log('Account created successfully');
          
          const imageRef = ref(storage, `images/${uniqueFileName}`);
          await uploadBytes(imageRef, blob);
          console.log(selectedImage);
          const imageUrl = await getDownloadURL(imageRef);

          updateProfile(userCredential.user, {
            displayName: username,
            photoURL: imageUrl
          });

          console.log("jee", userCredential.user.uid);

          const docRef = setDoc(doc(firestore, profile, userCredential.user.uid), {
            //id: userCredential.user.id,
            username: username,
            fname: fname,
            lname: lname,
          })
            .catch(error => console.log(error));

          setUser(userCredential.user);

          console.log("register", userCredential.user);
          console.log("asd", id);


          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });

        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
            console.log('Email already in use!');

          }
          if (error.code === 'auth/invalid') {
            console.log('Invalid email!');
          }
          if (error.code === 'auth/weak-password') {
            console.log('Password weak');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('Invalid email');
          }

        });
    } else {
      console.log('Check email and passwords!');
    }
  };

  return (
    <ScrollView>

      <Text style={styles.header}>Create account!</Text>

      <TextInput
        style={styles.input}
        label="Username"
        value={username}
        mode='outlined'
        secureTextEntry={false}
        onChangeText={text => setUsername(text)} />
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        mode='outlined'
        inputMode='email'
        onChangeText={text => setEmail(text)} />
      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        mode='outlined'
        secureTextEntry={true}
        onChangeText={text => setPassword(text)} />
      <TextInput
        style={styles.input}
        label="Confirm password"
        value={password2}
        mode='outlined'
        secureTextEntry={true}
        onChangeText={text => setPassword2(text)} />
      <TextInput
        style={styles.input}
        label="Firstname"
        value={fname}
        mode='outlined'
        secureTextEntry={false}
        onChangeText={text => setFname(text)} />
      <TextInput
        style={styles.input}
        label="Lastname"
        value={lname}
        mode='outlined'
        secureTextEntry={false}
        onChangeText={text => setLname(text)} />
      <AddImage onChangeImage={handleImageChange} />
      <Button
        onPress={submit}
      >Submit</Button>
      
    </ScrollView>
  );
}


function AddImage(props) {
	
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = async () => { 
  
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
    if (permissionResult.granted === false) {
    alert('Permission to access camera roll is required!');
    RequestStoragePermission();
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: false,
    });
    console.log('Picker Result:', pickerResult);

    if (!pickerResult.canceled) {
      const selectedUri = pickerResult.assets[0].uri;
      setSelectedImage(selectedUri);
      props.onChangeImage(selectedUri);
    }
  };

  return (
      <View>
          <View style={{ alignItems: 'center' }}>
              {selectedImage && (
                  <Image
                      source={{ uri: selectedImage }}
                      style={{ width: 200, height: 200, borderRadius: 10 }}
                      resizeMode="cover"
                  />
              )}
          </View>
          <View style={{ marginTop: 20 }}>
              <Pressable style={styles.addImagesButton} onPress={openImagePicker}>
                  <MaterialCommunityIcons name="camera-outline" color={'black'} size={30} />
                  <Text style={styles.buttonText}>Add profile picture</Text>
              </Pressable>
          </View>
      </View>
  );
}


export const styles = StyleSheet.create({
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
  },
  addImagesButton: {
    flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginHorizontal: 15,
		marginVertical: 15,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: '#0582CA',
	},
	buttonText: {
    marginLeft: 10,
	  fontSize: 16,
	  lineHeight: 21,
	  fontWeight: 'bold',
	  letterSpacing: 0.25,
	  color: 'white',
	},
});