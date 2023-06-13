import React from "react";
import { SafeAreaView, Text, View, StatusBar, StyleSheet } from "react-native";
import { COLORS } from "../../../assets/constants/colors";

const SettleUp = ({ navigation, route }) => {
  const { group, expenseList, token, userId } = route.params;

  console.log(expenseList);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bottomSheet}>
        <View style={styles.compTitle}>
          <Text style={styles.compTitleStyle}>Settle Up</Text>
        </View>
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

export default SettleUp;
