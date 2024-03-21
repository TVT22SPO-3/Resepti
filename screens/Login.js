import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { getAuth, auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '../firebase/config';
import { firestore, collection, addDoc, serverTimestamp } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';


  
export default function Login(){
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [logged, setLogged] = useState(false);

	const login = () => {
		signInWithEmailAndPassword(auth, username, password)
			.then((userCredential) => {
				console.log(userCredential.user); 
				setLogged(true);
				//AsyncStorage.setItem('userId', userCredential.user.uid);
			})
			.catch((error) => {
				if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
					console.log('Invalid credentials');
				} else if (error.code === 'auth/too-many-requests') {
					console.log('Too many attempts to login');
				} else {
					console.error(error.code, error.message);
				}
			});
	};

	const logout = () => {
		signOut(auth)
			.then(() => {
				setLogged(false);
				AsyncStorage.removeItem('userId');
				console.log('User signed out successfully.');
			})
			.catch((error) => {

				console.error('Error signing out:', error);
			});
	};

	return(
		<View style={styles.inputView}>
			<TextInput
				style={styles.TextInput}
				placeholder="username"
				placeholderTextColor="#003f5c"
				onChangeText={(username) => setUsername(username)}
			/>
			<TextInput
				style={styles.TextInput}
				placeholder="Password"
				placeholderTextColor="#003f5c"
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>
			<Button style={styles.loginButton} title='login' onPress={login} />
			<Button style={styles.loginButton} title='logout' onPress={logout} />
			<Text>{logged ? 'you are logged in :)' : 'you are logged out :('}</Text>
		</View>

	);
}

const styles = StyleSheet.create({

	inputView: {
    backgroundColor: '#26547C',
    width: "70%",
    height: 270,
    marginBottom: 20,
		borderRadius: 6,
    alignItems: "center",
  },
  TextInput: {
		backgroundColor: '#FFFCF9',
    height: 50,
		width: 220,
		marginTop: 25,
		margin: 10,
    padding: 10,
		borderRadius: 3,
  },
	loginButton: {
		width: 220,
		margin: 10,
	},
});