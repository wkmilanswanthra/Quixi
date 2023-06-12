import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  NavigationContainer,
  PreventRemoveContext,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaymentHistory } from "./PaymentHistory";
import Paypal from "./Paypal";
import { COLORS } from "../../../assets/constants/colors";
import {
  PAYMENT_ROUTES,
  TRANSACTION_ROUTES,
} from "../../../assets/constants/routes";
import Axios from "axios";
import { Rating, AirbnbRating } from "react-native-ratings";

const Stack = createNativeStackNavigator();

export default function PaymentDisplay({ navigation, route }) {
  const { transaction, userId, token, expense, setTransactions, transactions } =
    route.params;

  const [rating, setRating] = useState(null);

  const settlePayment = async () => {
    console.log("Paying...");
    let status = "";
    if (transaction.paidBy._id === userId.replaceAll('"', "")) {
      status = "paid";
    } else {
      status = "completed";
    }
    const url = TRANSACTION_ROUTES.UPDATE_BY_ID(transaction._id);
    data = {
      status: status,
    };
    if (rating) {
      data.rating = rating;
      data.user = transaction.paidBy._id;
    }
    const config = {
      method: "patch",
      url: url,
      headers: {
        Authorization: `Bearer ${token.replaceAll('"', "")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    const response = await Axios(config);
    console.log(response.data);

    if (response.data.status === "success") {
      const url2 = PAYMENT_ROUTES.CREATE;
      const config2 = {
        method: "post",
        url: url2,
        headers: {
          Authorization: `Bearer ${token.replaceAll('"', "")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          amount: transaction.amount,
          paidBy: transaction.paidBy._id,
          paidTo: transaction.paidTo._id,
          transactionId: transaction._id,
        },
      };

      const response2 = await Axios(config2);
      console.log(response2.data);
      let trans = transactions.filter((t) => t._id !== transaction._id);
      console.log(response.data.transaction);
      trans.push(response.data.transaction);
      setTransactions(trans);
      Alert.alert("Payment Successful");

      navigation.goBack();
    } else {
      Alert.alert("Payment Failed");
    }
  };

  const sendNotification = async () => {
    console.log("Sending Notification...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bottomSheet}>
        <View style={styles.compTitle}>
          <Text style={styles.compTitleStyle}>{expense?.name}</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.headerText}>
            {transaction.paidTo._id === userId.replaceAll('"', "")
              ? `${transaction.paidBy.name} owes you`
              : `You owe ${transaction.paidTo.name}`}
          </Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>Rs.{transaction.amount.toFixed(2)}</Text>
        </View>
        {transaction.paidTo._id === userId.replaceAll('"', "") &&
          transaction.status !== "comleted" && (
            <View style={{ marginTop: 30 }}>
              <Text
                style={{ textAlign: "center", fontSize: 15, marginBottom: -15 }}
              >
                Rate {transaction.paidBy.name} on their payment
              </Text>
              <AirbnbRating
                count={5}
                defaultRating={5}
                size={20}
                reviewSize={0}
                onFinishRating={(rating) => setRating(rating)}
              />
            </View>
          )}
        <View style={styles.buttonContainer}>
          {transaction.paidTo._id === userId.replaceAll('"', "") &&
            transaction.status === "paid" && (
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: COLORS.PRIMARY,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                {transaction.paidBy.name} has already made a payment of Rs.
                {transaction.amount.toFixed(2)}
                {"\n\n"} Do you want to mark this as paid?
              </Text>
            )}
          <TouchableOpacity style={styles.buttonOne} onPress={settlePayment}>
            <Text style={styles.buttonText}>
              {!(transaction.paidTo._id === userId.replaceAll('"', ""))
                ? `Pay ${transaction.paidTo.name}`
                : "Mark as Paid"}
            </Text>
          </TouchableOpacity>
          {transaction.paidTo._id === userId.replaceAll('"', "") &&
            transaction.status === "pending" && (
              <TouchableOpacity
                style={styles.buttonOne}
                onPress={sendNotification}
              >
                <Text style={styles.buttonText}>
                  Notify {transaction.paidBy.name}
                </Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    </SafeAreaView>
  );
}

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
  valueContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    color: "black",
    textAlign: "center",
    fontSize: 45,
  },
  header: {
    height: 50,
    marginTop: 150,
  },
  headerText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  buttonOne: {
    backgroundColor: COLORS.PRIMARY,
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
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
