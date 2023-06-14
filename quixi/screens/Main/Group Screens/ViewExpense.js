import react from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { COLORS } from "../../../assets/constants/colors";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  EXPENSE_ROUTES,
  TRANSACTION_ROUTES,
} from "../../../assets/constants/routes";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const ViewExpense = ({ navigation, route }) => {
  const { expense, userId, token, groupId, expenseList, setExpenseList } =
    route.params;

  const [transactions, setTransactions] = useState([]);

  console.log(expense);

  useEffect(() => {
    if (expense) {
      getTransactions();
    }
  }, []);

  const getTransactions = async () => {
    try {
      const trans = [];
      for (let i = 0; i < expense.transactions.length; i++) {
        console.log("Hereeeeeeee --  ",expense.transactions[i]);
        const url = TRANSACTION_ROUTES.FIND_BY_ID(expense.transactions[i]);
        console.log(url)
        const config = {
          method: "get",
          url: url,
          headers: {
            authorization: "Bearer " + token.replaceAll('"', ""),
          },
        };
        const response = await axios(config);
        trans.push(response.data);
      }
      setTransactions(trans);

    } catch (err) {
      console.error(err.message);
    }
  };

  const goToSettle = (transaction) => {
    // console.log(transaction);
    navigation.navigate("PaymentDisplay", {
      transaction: transaction,
      setTransactions: setTransactions,
      transactions: transactions,
      userId: userId,
      token: token,
      groupId: groupId,
      expense: expense,
    });
  };

  const deleteExpense = async () => {
    const confirmDelete = async () => {
      try {
        const url = EXPENSE_ROUTES.DELETE_BY_ID(expense._id);
        const config = {
          method: "delete",
          url: url,
          headers: {
            authorization: "Bearer " + token.replaceAll('"', ""),
          },
        };
        const response = await axios(config);
        console.log(response.data);
        const list = expenseList.filter(
          (exp) =>
            exp._id.replaceAll('"', "") !== expense._id.replaceAll('"', "")
        );
        setExpenseList(list);
        alert("Expense deleted successfully");
        navigation.goBack();
      } catch (err) {
        console.error(err.message);
      }
    };

    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: confirmDelete,
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  console.log("Transactionsssss --- ",transactions);
  console.log("Expense --- ",expense);
  console.log("Expense List --- ",expenseList);
  console.log("Group Id --- ",groupId);
  console.log("User Id --- ",userId);
  console.log("Token --- ",token);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bottomSheet}>
        <View style={styles.compTitle}>
          <Text style={styles.compTitleStyle}>{expense.name}</Text>
        </View>
        <ScrollView style={{ marginTop: 20, maxHeight: 500 }}>
          {transactions && transactions.map((transaction, index) => (
            <View key={index} style={styles.groupSlot}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}  
              >
                <View style={styles.groupRowDetail}>
                  <Text style={styles.groupOwe}>
                    {`${
                      transaction.paidBy._id == userId.replaceAll('"', "")
                        ? "You"
                        : transaction.paidBy.name
                    } owes ${
                      transaction.paidTo._id == userId.replaceAll('"', "")
                        ? "You"
                        : transaction.paidTo.name
                    }   `}
                  </Text>
                </View>
                <View style={styles.groupRowDetail}>
                  <Text style={styles.groupCreatedBy} numberOfLines={1}>
                    Rs. {transaction.amount.toFixed(2)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text style={styles.groupBalance}>
                  Status :{" "}
                  <Text
                    style={
                      transaction.status === "completed"
                        ? styles.completedTransaction
                        : styles.groupBalance
                    }
                  >
                    {transaction.status.toLowerCase().charAt(0).toUpperCase() +
                      transaction.status.slice(1)}
                  </Text>
                </Text>
                {(transaction.paidTo._id == userId.replaceAll('"', "") ||
                  transaction.paidBy._id == userId.replaceAll('"', "")) &&
                  (transaction.status === "pending" ||
                    (transaction.paidTo._id == userId.replaceAll('"', "") &&
                      transaction.status === "paid")) && (
                    <TouchableOpacity
                      onPress={() => goToSettle(transaction)}
                      style={styles.btn}
                    >
                      <Text style={styles.btnSetText}>
                        {transaction.paidTo._id == userId.replaceAll('"', "")
                          ? "View details"
                          : "Settle"}
                      </Text>
                    </TouchableOpacity>
                  )}
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.groupPageIconLine}
          onPress={deleteExpense}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
          <Text style={[styles.groupIconText, { color: "red" }]}>
            Delete Expense
          </Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    marginBottom: 12,
  },
  amount: {
    fontSize: 20,
    marginBottom: 12,
  },
  paidBy: {
    fontSize: 20,
    marginBottom: 12,
  },
  date: {
    fontSize: 20,
    marginBottom: 12,
  },
  category: {
    fontSize: 20,
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  groupSlot: {
    backgroundColor: "white",
    height: 80,
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
    fontWeight: "bold",
  },
  groupBalance: {
    fontWeight: "bold",
  },
  scrollView: {
    maxHeight: 300,
    marginTop: 10,
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
  btn: {
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    width: 100,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
  },
  btnSetText: {
    fontSize: 12,
    color: "#000000",
    backgroundColor: "#D9D9D9",
    fontWeight: "bold",
    textAlign: "center",
  },
  completedTransaction: {
    color: COLORS.POSITIVE,
    fontWeight: "bold",
  },
  groupPageIconLine: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 30,
    alignItems: "center",
  },
  groupIconText: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default ViewExpense;
