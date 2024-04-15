import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getAuth, auth, signInWithEmailAndPassword, signOut, } from '../firebase/config';
import { firestore, collection, addDoc, serverTimestamp } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/useAuth';
import { AuthContext } from '../context/CreateAuthContext';
import Styles from '../Styles';
import { useTheme } from '../context/useTheme';


export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [logged, setLogged] = useState(false);
	const { setUser } = useAuth()
	const navigation = useNavigation()
	const isDarkMode = useTheme();



	const login = () => {
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

	const logout = () => {
		signOut(auth)
			.then(() => {
				setLogged(false);
				console.log('User signed out successfully.');
				navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
			})
			.catch((error) => {

				console.error('Error signing out:', error);
			});
	};

	return (
		<View style={[Styles.container,isDarkMode ? Styles.dark : Styles.light]}>
			<TextInput
				style={Styles.TextInput}
				placeholder="Username"
				placeholderTextColor="#003f5c"
				onChangeText={(username) => setUsername(username)}
			/>
			<TextInput
				style={Styles.TextInput}
				placeholder="Password"
				placeholderTextColor="#003f5c"
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>
			<Button style={Styles.button} title='login' onPress={login} />
			<Button style={Styles.button} title='logout' onPress={logout} />
			<Text style={isDarkMode ? Styles.dark : Styles.light}>{logged ? 'you are logged in :)' : 'you are logged out :('}</Text>
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