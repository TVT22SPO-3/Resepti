import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        fontWeight: "bold",
        alignItems: 'center',
    },
    light: {
        backgroundColor: '#f5f5f5',
        fontStyle: 'italic',
        color: '#333',
    },
    dark: {
        backgroundColor: '#333',
        fontStyle: 'italic',
        color: '#f5f5f5',
    },
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
    button:{
        marginVertical: 12,
        width: 240,
        },
})