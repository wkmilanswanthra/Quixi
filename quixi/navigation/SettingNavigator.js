import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/Main/Profile Screens/Settings";
import AboutInfo from "../screens/Main/Profile Screens/Setting Screens/AboutInfo";
import Appearence from "../screens/Main/Profile Screens/Setting Screens/Appearence";
import Notifications from "../screens/Main/Profile Screens/Setting Screens/Notifications";
import Payment from "../screens/Main/Profile Screens/Setting Screens/Payment";
import Privacy from "../screens/Main/Profile Screens/Setting Screens/Privacy";

const Stack = createStackNavigator();

export default function SettingsNavigator({ route }) {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Appearence" component={Appearence} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="AboutInfo" component={AboutInfo} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Privacy" component={Privacy} />
    </Stack.Navigator>
  );
}
