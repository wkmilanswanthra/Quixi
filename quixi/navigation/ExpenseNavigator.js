import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddExpense from "../screens/Main/AddExpense";
import SplitAmong from "../screens/Main/Expense Screens/SplitAmong";
import SplitAmount from "../screens/Main/Expense Screens/PaidBy";
import Receipt from "../screens/Main/Expense Screens/Receipt";

const Stack = createStackNavigator();

export default function ExpenseNavigator() {
  console.log("ExpenseNavigator");
  return (
    <Stack.Navigator
      initialRouteName="AddExpenses"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AddExpenses" component={AddExpense} />
      <Stack.Screen name="AddMembers" component={SplitAmong} />
      <Stack.Screen name="PaidBy" component={SplitAmount} />
      <Stack.Screen name="Receipt" component={Receipt} />
    </Stack.Navigator>
  );
}
