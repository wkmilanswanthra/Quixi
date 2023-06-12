import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PaymentDisplay from "../screens/Main/Payment Screens/PaymentDisplay";
import Friends from "../screens/Main/Friends";

const Stack = createStackNavigator();

export default function FriendsNavigator() {
  console.log("ExpenseNavigator");
  return (
    <Stack.Navigator
      initialRouteName="Friends"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="PaymentDisplay" component={PaymentDisplay} />
    </Stack.Navigator>
  );
}
