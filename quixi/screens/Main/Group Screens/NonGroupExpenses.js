import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { COLORS } from "../../../assets/constants/colors";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { EXPENSE_ROUTES, GROUP_ROUTES } from "../../../assets/constants/routes";
import Axios from "axios";

const NonGroupExpenses = ({ navigation, route }) => {
  const userId = route.params.userId;
  const token = route.params.token;

  const [expenseList, setExpenseList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getExpenseData();
  }, []);

  function getExpenseData() {
    const url = EXPENSE_ROUTES.FIND_NON_GROUP_BY_ID(userId.replaceAll('"', ""));
    let config = {
      method: "get",
      url: url,
      headers: {
        authorization: "Bearer " + token.replaceAll('"', ""),
      },
    };

    Axios(config)
      .then((response) => {
        console.log(response.data);
        setExpenseList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getExpenseData();
    setRefreshing(false);
  }, []);

  console.log(expenseList);

  const goToExpense = (expense) => {
    navigation.navigate("ViewExpense", {
      expense: expense,
      userId: userId,
      token: token,
      expenseList: expenseList,
      setExpenseList: setExpenseList,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bottomSheet}>
        <View style={styles.compTitle}>
          <Text style={styles.compTitleStyle}>Non group expenses</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!(expenseList === []) &&
            expenseList.map((expense, index) => (
              <TouchableOpacity
                key={index}
                style={styles.groupSlot}
                onPress={() => goToExpense(expense)}
              >
                <View style={styles.groupRowDetail}>
                  <Text style={styles.groupName}>{expense.name}</Text>
                  <Text style={styles.groupOwe}>{expense.category}</Text>
                </View>
                <View style={styles.groupRowDetail}>
                  <Text style={styles.groupCreatedBy} numberOfLines={1}>
                    {expense.description}
                  </Text>
                  <Text style={styles.groupBalance}> {expense.amount}</Text>
                </View>
              </TouchableOpacity>
            ))}
          <View style={styles.endTextContainer}>
            <Text style={styles.endText}> End of Expenses list </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    height: "100%",
    backgroundColor: COLORS.BG,
    width: "100%",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    marginTop: 40,
  },
  container: {
    paddingTop: 10,
    backgroundColor: COLORS.PRIMARY,
  },
  groupSlot: {
    backgroundColor: "white",
    height: 70,
    width: "85%",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    borderRadius: 20,
    flexDirection: "column",
  },
  groupRowDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupName: {
    fontWeight: "bold",
    overflow: "hidden",
  },
  groupOwe: {},
  groupCreatedBy: {
    width: 200,
    overflow: "hidden",
  },
  groupBalance: {
    fontWeight: "bold",
  },
  scrollView: {
    maxHeight: 300,
    marginTop: 30,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    marginBottom: 0,
  },
  endTextContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  endText: {
    color: COLORS.GREY,
  },
  compTitle: {
    marginTop: 30,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  compTitleStyle: {
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default NonGroupExpenses;
