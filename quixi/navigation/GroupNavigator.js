import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Groups from "../screens/Main/Groups";
import Group from "../screens/Main/Group Screens/Group";
import CreateGroup from "../screens/Main/Group Screens/CreateGroup";
import AddMembers from "../screens/Main/Group Screens/AddMembers";
import AddExpense from "../screens/Main/AddExpense";
import SplitAmong from "../screens/Main/Expense Screens/SplitAmong";
import SplitAmount from "../screens/Main/Expense Screens/PaidBy";
import NonGroupExpenses from "../screens/Main/Group Screens/NonGroupExpenses";
import ViewExpense from "../screens/Main/Group Screens/ViewExpense";
import PaymentDisplay from "../screens/Main/Payment Screens/PaymentDisplay";

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
      <Stack.Screen name="AddExpense" component={AddExpense} />
      <Stack.Screen name="SplitAmong" component={SplitAmong} />
      <Stack.Screen name="PaidBy" component={SplitAmount} />
      <Stack.Screen name="NonGroupExpenses" component={NonGroupExpenses} />
      <Stack.Screen name="ViewExpense" component={ViewExpense} />
      <Stack.Screen name="PaymentDisplay" component={PaymentDisplay} />
    </Stack.Navigator>
  );
}
