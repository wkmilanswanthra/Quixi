import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { USER_ROUTES } from "../../../assets/constants/routes";
import Checkbox from "expo-checkbox";
import { Rating, AirbnbRating } from "react-native-ratings";
import { COLORS } from "../../../assets/constants/colors";

// import CustomCheckbox from './CheckBox';

const SplitAmong = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [members, setMembers] = useState([]);
  const setSplitAmong = route.params.setSplitAmong;
  const splitAmong = route.params.splitAmong;

  useEffect(() => {
    async function fetchData() {
      if (route.params?.members) {
        setIsGroup(true);
        setMembers(route.params.members);
      }
      await getToken();
      await getUserId();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (userId !== "" && token !== "" && isGroup === false) {
      getMovies();
    }
    if (userId !== "" && token !== "" && isGroup === true) {
      console.log("members", members);
      console.log("userId", userId);
      const meme = members.filter((element) => element._id !== userId);
      setData(meme);
      setLoading(false);
    }
  }, [userId, token, isGroup]);

  const getUserId = async () => {
    const userID = await SecureStore.getItemAsync("userId");
    setUserId(userID);
  };

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    setToken(token);
  };

  const getMovies = async () => {
    try {
      axios
        .get(USER_ROUTES.FIND, {
          headers: { Authorization: "Bearer " + token.replaceAll('"', "") },
        })
        .then((res) => {
          res.data = res.data.filter((element) => element._id !== userId);
          res.data.forEach((element) => {
            element.isChecked = false;
            if (splitAmong) {
              splitAmong.forEach((split) => {
                if (split._id === element._id) {
                  element.isChecked = true;
                }
              });
            }
          });
          res.data = res.data.map(
            ({ _id, name, isChecked, profileImgUrl, rating }) => ({
              _id,
              name,
              isChecked,
              profileImgUrl,
              rating,
            })
          );
          setData(res.data);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setList = () => {
    const selected = data.filter((item) => item.isChecked);
    setSplitAmong(selected);
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.header}>
            <SearchBar
              style={styles.search}
              placeholder="Name, E-mail or Phone No"
              lightTheme
              //   round
              //   onChangeText={(text) => this.searchFunction(text)}
              autoCorrect={false}
            />

            <FlatList
              style={styles.flatlist}
              data={data}
              keyExtractor={({ _id }) => _id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  {/* <Image
                    style={styles.view1}
                    source={require("../../../assets/images/person.jpg")}
                  ></Image> */}
                  <Image
                    style={styles.img}
                    source={{
                      uri:
                        item.profileImgUrl || "https://picsum.photos/200/200",
                    }}
                  />

                  <View style={{}}>
                    <Text
                      style={{
                        marginBottom: -20,
                        marginLeft: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Text>
                    {/* <Rating
                      defaultRating={3}
                      ratingCount={7}
                      imageSize={15}
                      ratingColor="#000"
                      ratingBackgroundColor="#362342"
                      isDisabled={true}
                    /> */}
                    <AirbnbRating
                      count={5}
                      defaultRating={item.rating}
                      size={15}
                      reviewSize={0}
                      isDisabled={true}
                    />
                  </View>
                  <Checkbox
                    disabled={item._id === userId.replaceAll('"', "")}
                    style={styles.checkbox}
                    value={item.isChecked}
                    onValueChange={(newValue) => {
                      const updatedData = data.map((dataItem) => {
                        if (dataItem._id === item._id) {
                          return { ...dataItem, isChecked: newValue };
                        }
                        return dataItem;
                      });
                      setData(updatedData);
                    }}
                    color="#000"
                  />
                </View>
              )}
            />
          </View>
        )}
      </View>
      <View style={styles.btn}>
        <TouchableHighlight onPress={setList}>
          <Text style={styles.btn1}>Ok</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default SplitAmong;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 75,
    //padding: 10,
  },

  flatlist: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    //paddingLeft: 10,
    paddingTop: 25,
  },

  view1: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    //margin: 10,
    marginRight: 50,
  },
  search: {
    //width:150
  },
  btn1: {
    borderWidth: 2,
    padding: 15,
    //paddingHorizontal:50,
    borderColor: "black",
    color: "white",
    backgroundColor: "#010B40",
    fontSize: 18,
  },
  btn: {
    //alignItems:'flex-end',
    marginTop: 20,
    marginRight: 20,
    marginLeft: "75%",
    height: 50,
    marginBottom: 50,
  },
  checkbox: {
    marginLeft: "auto",
    marginRight: 5,
    //marginLeft:50
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    backgroundColor: "white",
    borderColor: COLORS.BUTTON,
    borderWidth: 2,
    borderRadius: 25,
    margin: 10,
  },
});
