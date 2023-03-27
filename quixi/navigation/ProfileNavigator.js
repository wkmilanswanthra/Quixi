import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Profile from "../screens/Main/Profile";
import EditAccount from "../screens/Main/Profile Screens/EditAccount";
import Settings from "../screens/Main/Profile Screens/Settings"
import RequestAssistance from "../screens/Main/Profile Screens/RequestAssistance"

const Stack = createStackNavigator();

export default function ProfileNavigator({route}) {
    const { setUserToken } = route.params;
    return (
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Profile" component={Profile} initialParams={{setUserToken}}/>
            <Stack.Screen name="EditAccount" component={EditAccount}/>
            <Stack.Screen name="Settings" component={Settings}/>
            <Stack.Screen name="RequestAssistance" component={RequestAssistance} />
        </Stack.Navigator>
    );
};