import React from "react";
import { SafeAreaView, Text, View, StatusBar, StyleSheet } from "react-native";
import { COLORS } from "../../../assets/constants/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import { GROUP_ROUTES } from "../../../assets/constants/routes";

const SettleUp = ({ navigation, route }) => {
  const { group, expenseList, token, userId } = route.params;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (group) {
      getExpenseData();
    }
  }, []);

  function getExpenseData() {
    const url = GROUP_ROUTES.FIND_BY_ID(group._id);
    let config = {
      method: "get",
      url: url,
      headers: {
        authorization: "Bearer " + token.replaceAll('"', ""),
      },
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
