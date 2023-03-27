/**
 * This component is the root component of the app that handles persistent authentication and navigation
 */
import React, {useEffect, useState, createContext, useContext} from "react";
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigator from "./navigation/AuthNavigator";
import HomeNavigator from "./navigation/HomeNavigator";
import * as SecureStore from "expo-secure-store";
import {validateToken, getToken} from "./services/TokenValidator"

// Create a new stack navigator
const Stack = createNativeStackNavigator();

/**
 * App is the root component of the app.
 *
 * @return {JSX.Element} Root component of the app.
 */
export default function App() {

    // State variable to hold user token
    const [userToken, setUserToken] = useState(null);
    // Check user authentication status on component mount
    useEffect(() => {
        async function checkAuth() {
            try {
                // Get user token from secure storage
                const token = await getToken();

                if (token) {
                    // If token exists, validate it
                    await validateToken(token.replaceAll('"', ''));

                    // If validation succeeds, set user token
                    setUserToken(token.replaceAll('"', ''));
                }
            } catch (error) {
                // Handle errors appropriately
                console.error(error, 'here');
                // Show error message to user
            }
        }

        checkAuth();
    }, []);


    return (
        // Render navigation container
        <AuthProvider>
            <NavigationContainer>
                {/* Render status bar*/}
                <StatusBar style="dark"/>

                {/*Render stack navigator*/}
                <Stack.Navigator
                    screenOptions={{headerShown: false}}>

                    {/*Conditionally render authentication or home navigator based on token existence*/}
                    {userToken == null ? (
                        // No token found, user isn't signed in
                        <Stack.Screen name="Auth" component={AuthNavigator} initialParams={{setUserToken}}/>
                    ) : (
                        // User is signed in
                        <Stack.Screen name="Home" component={HomeNavigator} initialParams={{setUserToken}}/>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
};
