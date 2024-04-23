import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAuth, auth, signInWithEmailAndPassword, signOut, } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/useAuth';
import { AuthContext } from '../context/CreateAuthContext';
import Styles from '../Styles';
import { useTheme } from '../context/useTheme';



export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [logged, setLogged] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [errorTrue, setErrorTrue] = useState(false);
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
				setErrorTrue(true);
				if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
					console.log('Invalid credentialssss');
					setErrorMessage('Invalid credentials!');
				} else if (error.code === 'auth/too-many-requests') {
					console.log('Too many attempts to login');
					setErrorMessage('Too many attempts to login!');
				} else {
					console.error(error.code, error.message);
				}
			});
	};

	return (
		<View style={[styles.inputView, isDarkMode ? Styles.dark : Styles.light]}>
			<Text style={[styles.header, isDarkMode ? Styles.dark : Styles.light]}>Login here</Text>
			<TextInput
				style={styles.TextInput}
				label="Username"
				mode='outlined'
				error={errorTrue}
				secureTextEntry={false}
				onChangeText={(username) => setUsername(username)}
			/>
			<TextInput
				style={styles.TextInput}
				label="Password"
				mode='outlined'
				error={errorTrue}
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>
			<Text style={styles.errorText}>{errorMessage}</Text>
			<Pressable style={styles.loginButton} onPress={login}>
				<MaterialCommunityIcons name="check" color={'black'} size={30} />
				<Text style={styles.buttonText}>Login</Text>
        	</Pressable>
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
	header: {
		fontSize: 24,
		paddingTop: 24,
		paddingBottom: 24,
		marginHorizontal: 12,
		textAlign: 'center'
	},
	inputView: {
		height: '100%',
		marginBottom: 20,
		alignItems: "center",
	},
	TextInput: {
		backgroundColor: '#FFFCF9',
		height: 40,
		width: 300,
		marginTop: 25,
		margin: 10,
		padding: 10,
		borderRadius: 3,
	},
	loginText: {
		marginLeft: 10,
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		//color: 'white',
	},
	loginButton:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 300,
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginHorizontal: 15,
		marginVertical: 8,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: '#ffa500'
	},
	errorText: {
		fontSize: 15,
	},
});

export { Logout };