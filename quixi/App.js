import React from "react";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from "./Navigation/AuthNavigator";

export default function App() {
    const isAuthenticated = true;
    return (
        <NavigationContainer>
            <StatusBar style="dark"/>
            {isAuthenticated? <AuthNavigator/>: <AuthNavigator/>}
        </NavigationContainer>
    );
};