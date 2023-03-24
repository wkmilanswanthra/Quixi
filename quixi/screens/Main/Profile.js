import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Profile({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={{uri: 'https://i.pravatar.cc/150'}} style={styles.profilePic}/>
                    <Text style={styles.username}>John Doe</Text>
                    <Icon name='create-outline' size={15} color='#333'/>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button}>
                    <View style={styles.btnBg}><Icon name='person-circle-outline' size={24} color='#333'/></View>
                    <Text style={styles.buttonText}>Account Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <View style={styles.btnBg}><Icon name='settings-outline' size={24} color='#333'/></View>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <View style={styles.btnBg}><Icon name='help-circle-outline' size={24} color='#333'/></View>
                    <Text style={styles.buttonText}>Get Assistance</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Logout pressed')}>
                <View style={styles.btnBgLo}><Icon name='log-out-outline' size={24} color='#333'/></View>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 50,
        paddingHorizontal: 20
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 40,
        borderColor: '#203b86',
        borderWidth: 4,
    },
    username: {
        marginLeft: 20,
        marginRight: 10,
        fontSize: 25,
    },
    buttons: {
        marginTop: 50,
        marginBottom: 20,
        paddingHorizontal: 20
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 10,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    buttonText: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E1E1E',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderColor: '#ff4646',
        borderWidth: 1,
    },
    logoutButtonText: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    }, btnBg: {
        backgroundColor: 'rgb(191,217,250)',
        padding: 10,
        borderRadius: 10
    },
    btnBgLo: {
        backgroundColor: 'rgb(255,196,204)',
        padding: 10,
        borderRadius: 10
    }

});