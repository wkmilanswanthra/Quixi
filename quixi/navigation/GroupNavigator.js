import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Groups from "../screens/Main/Groups";
import Group from "../screens/Main/Group Screens/Group";
import CreateGroup from "../screens/Main/Group Screens/CreateGroup";
import AddMembers from "../screens/Main/Group Screens/AddMembers";

const Stack = createStackNavigator();

export default function GroupNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Groups"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Groups" component={Groups} />
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="AddMembers" component={AddMembers} />
    </Stack.Navigator>
  );
}
