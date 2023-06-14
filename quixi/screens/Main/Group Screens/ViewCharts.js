import react from "react";
import { Text, View, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { COLORS } from "../../../assets/constants/colors";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import Group from "./Group";
import axios from "axios";
import { TRANSACTION_ROUTES } from "../../../assets/constants/routes";

const ViewCharts = ({ navigation, route }) => {
  const { group, token, userId, expenseList } = route.params;

  const [transactions, setTransactions] = react.useState([]);
  const [payed, setPayed] = react.useState([]);
  const [received, setReceived] = react.useState([]);

  react.useEffect(() => {
    if (group) {
      getTransactions();
    }
  }, []);

  const getTransactions = async () => {
    let list = [];

    for (let i = 0; i < expenseList.length; i++) {
      for (let j = 0; j < expenseList[i].transactions.length; j++) {
        const url = TRANSACTION_ROUTES.FIND_BY_ID(
          expenseList[i].transactions[j]
        );
        let config = {
          method: "get",
          url: url,
          headers: {
            authorization: "Bearer " + token.replaceAll('"', ""),
          },
        };
        await axios(config)
          .then(function (response) {
            if (
              response.data.paidBy._id === userId.replaceAll('"', "") ||
              response.data.paidTo._id === userId.replaceAll('"', "")
            )
              list.push(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    setTransactions(list);
  };

  const getPayed = () => {
    let list = [];
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].paidBy._id === userId.replaceAll('"', ""))
        list.push(transactions[i]);
    }
    setPayed(list);
  };

  const getReceived = () => {
    let list = [];
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].paidTo._id === userId.replaceAll('"', ""))
        list.push(transactions[i]);
    }
    setReceived(list);
  };

  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  console.log(transactions);
  console.log(payed)
  console.log(received)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bottomSheet}>
        <View style={styles.compTitle}>
          <Text style={styles.compTitleStyle}>Group summary</Text>
          <Text>{group.group.name}</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryBar data={data} x="quarter" y="earnings" />
          </VictoryChart>
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

export default ViewCharts;
