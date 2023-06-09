import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Main/Profile";
import EditAccount from "../screens/Main/Profile Screens/EditAccount";
import RequestAssistance from "../screens/Main/Profile Screens/RequestAssistance";
import SettingsNavigator from "../navigation/SettingNavigator";

const Stack = createStackNavigator();

export default function ProfileNavigator({ route }) {
  const { setUserToken } = route.params;
  console.log("ProfileNavigator");
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={{ setUserToken }}
      />
      <Stack.Screen name="EditAccount" component={EditAccount} />
      <Stack.Screen name="SettingsNavigator" component={SettingsNavigator} />
      <Stack.Screen name="RequestAssistance" component={RequestAssistance} />
    </Stack.Navigator>
  );
}
