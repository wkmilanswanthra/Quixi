import React, {useState} from 'react'
import {StyleSheet, SafeAreaView, Text, TextInput, View,} from 'react-native';
import Button from "../../components/Buttons/MainButton";
import TextLink from "../../components/Buttons/TextLink";

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic
        //Temp Login function to redirect to homepage
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>
                <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} keyboardType="email-address" autoCapitalize="none"/>
                <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry={true}/>
                <Button styles={styles.button} onPress={handleLogin} title="Login" color="dark" style={styles.button}/>
                <TextLink styles={styles.link} onPress={() => navigation.navigate('ForgotPassword')} text="Forgot password?" style={styles.link}/>
                <TextLink styles={styles.link} onPress={() => navigation.navigate('Register')} text="Create an account" style={styles.link}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        maxWidth: 400,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    },
    button:{
        marginTop: 10
    },
    link: {
        marginTop: 10,
    },
});