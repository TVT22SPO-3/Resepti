import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getAuth, auth, signInWithEmailAndPassword, signOut, } from '../firebase/config';
import { firestore, collection, addDoc, serverTimestamp } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/useAuth';
import { AuthContext } from '../context/CreateAuthContext';
import Styles from '../Styles';
import { useTheme } from '../context/useTheme';
import Stacknav from '../components/Stacknav';
import TopBarMenu from '../components/TopBar/LoginButton';


export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [logged, setLogged] = useState(false);
	const { setUser } = useAuth()
	const navigation = useNavigation()
	const isDarkMode = useTheme();

	const login = () => {
		console.log(password + username);
		signInWithEmailAndPassword(auth, username, password)
			.then((userCredential) => {
				console.log("Login", userCredential);
				setLogged(true);
				setUser(userCredential.user)
				navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
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

	/*const logout = () => {
		signOut(auth)
			.then(() => {
				setLogged(false);
				console.log('User signed out successfully.');
				navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
			})
			.catch((error) => {

				console.error('Error signing out:', error);
			});
	};*/

	return (
		<View style={[styles.container, isDarkMode ? Styles.dark : Styles.light]}>
			<TextInput
				style={styles.TextInput}
				label="Username"
				mode='outlined'
				secureTextEntry={false}
				onChangeText={(username) => setUsername(username)}
			/>
			<TextInput
				style={styles.TextInput}
				label="Password"
				mode='outlined'
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>
			<Button mode='outlined' style={[styles.loginButton, isDarkMode ? Styles.darkButtonText : Styles.lightButtonText]} onPress={login}>Login</Button>
		</View>
	);
}


function Logout(){
	//const navigation = useNavigation();
	console.log('logout clicked');

	signOut(auth)
		.then(() => {
			console.log('User signed out successfully.');
			//navigation.reset({ index: 0, routes: [{ name: 'Stacknav' }] })
			console.log(auth);
		})
		.catch((error) => {

			console.error('Error signing out:', error);
	});
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	  },
	inputView: {
		height: '100%',
		marginBottom: 20,
		alignItems: "center",
	},
	TextInput: {
		//backgroundColor: '#FFFCF9',
		height: 40,
		width: 300,
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

export { Logout };