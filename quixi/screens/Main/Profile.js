import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, Platform} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as SecureStore from 'expo-secure-store';
import Axios from 'axios';
import {useState} from "react";
import {COLORS} from "../../assets/constants/Colors";
import {StatusBar} from "react-native";

export default function Profile({navigation, route}) {

    const {setUserToken} = route.params;

    let [isLoggingOut, setIsLoggingOut] = useState(false);

    async function logout() {
        // Remove the JWT token from secure store
        await SecureStore.deleteItemAsync('token');
        // Remove the JWT token from Axios headers
        delete Axios.defaults.headers.common['Authorization'];
    }

    function handlePress(action) {
        switch (action) {
            case 'editAccount':
                navigation.navigate('EditAccount');
                break;
            case 'settings':
                navigation.navigate('Settings');
                break;
            case 'requestAssistance':
                navigation.navigate('RequestAssistance');
                break;
            case 'logout':
                setIsLoggingOut = true;
                logout().then(() => {
                    setIsLoggingOut = false;
                    console.log("Logged out successfully");
                    setUserToken(null);
                }).catch((e) => {
                    alert("Failed to logout.")
                    setIsLoggingOut = false;
                    console.log(e);
                });
                break;
            default:
                break;
        }
    }

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.bottomSheet}>
                <View style={styles.header}>
                    <Image source={{uri: 'https://i.pravatar.cc/150'}} style={styles.profilePic}/>
                    <Text style={styles.username}>John Doe</Text>
                    <Icon name='create-outline' size={15} color='#333'/>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress("editAccount")}>
                        <View style={styles.btnBg}><Icon name='person-circle-outline' size={24} color='#333'/></View>
                        <Text style={styles.buttonText}>Account Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress("settings")}>
                        <View style={styles.btnBg}><Icon name='settings-outline' size={24} color='#333'/></View>
                        <Text style={styles.buttonText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress("requestAssistance")}>
                        <View style={styles.btnBg}><Icon name='help-circle-outline' size={24} color='#333'/></View>
                        <Text style={styles.buttonText}>Get Assistance</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={() => handlePress("logout")}>
                    <View style={styles.btnBgLo}><Icon name='log-out-outline' size={24} color='#333'/></View>
                    {isLoggingOut ? (<ActivityIndicator size="small" color="#fff"/>) : (
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>);
};


const styles = StyleSheet.create({
    bottomSheet: {
        height: '100%', //change this after design it
        backgroundColor: COLORS.BG,
        width: '100%',
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10, // adjust for Android status bar
    }, container: {
        paddingTop: 10,
        backgroundColor: COLORS.PRIMARY,
    }, header: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 50, paddingHorizontal: 20
    }, profilePic: {
        width: 100, height: 100, borderRadius: 40, borderColor: '#203b86', borderWidth: 4,
    }, username: {
        marginLeft: 20, marginRight: 10, fontSize: 25,
    }, buttons: {
        marginTop: 50, marginBottom: 20, paddingHorizontal: 20
    }, button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 10,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1
    }, buttonText: {
        marginLeft: 20, fontSize: 16, fontWeight: 'bold', color: '#1E1E1E',
    }, logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderColor: '#ff4646',
        borderWidth: 1,
    }, logoutButtonText: {
        marginLeft: 20, fontSize: 16, fontWeight: 'bold', color: '#000000',
    }, btnBg: {
        backgroundColor: 'rgb(191,217,250)', padding: 10, borderRadius: 10
    }, btnBgLo: {
        backgroundColor: 'rgb(255,196,204)', padding: 10, borderRadius: 10
    }

});