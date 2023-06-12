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
import { GROUP_ROUTES, USER_ROUTES } from "../../../assets/constants/routes";
import Checkbox from "expo-checkbox";
import qs from "qs";
import { COLORS } from "../../../assets/constants/colors";
import { Rating, AirbnbRating } from "react-native-ratings";
export default function AddMembers({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [originalData, setOriginalData] = useState([]);

  const members = route.params?.members;
  const setMembers = route.params?.setMembers;
  useEffect(() => {
    async function fetchData() {
      await getToken();
      await getUserId();
    }
    fetchData();
    if (route.params?.groupId) {
      setGroupId(route.params.groupId);
    }
  }, []);
  useEffect(() => {
    if (userId !== "" && token !== "") {
      getMovies();
    }
  }, [userId, token, searchQuery]);
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
      const response = await axios.get(USER_ROUTES.FIND, {
        headers: { Authorization: "Bearer " + token.replaceAll('"', "") },
      });
  
      const filteredData = response.data.filter((element) =>
        element.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      const updatedData = filteredData.map(
        ({ _id, name, isGroupChecked, profileImgUrl, rating }) => ({
          _id,
          name,
          isGroupChecked,
          profileImgUrl,
          rating,
        })
      );
  
      updatedData.forEach((element) => {
        element.isGroupChecked = false;
        if (members) {
          members.forEach((member) => {
            if (element._id === member._id) {
              element.isGroupChecked = true;
            }
          });
        }
      });
  
      setData(updatedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const setList = async () => {
    const list = [];
    data.forEach((element) => {
      if (element.isGroupChecked) {
        list.push(element);
      }
    });
    const arr = [];
    // arr.push(userId.replaceAll('"', ""));
    list.forEach((element) => {
      arr.push(element._id);
    });
    console.log(JSON.stringify(arr));
    const url = GROUP_ROUTES.UPDATE(groupId);
    // const datas = { members: arr };
    // console.log(datas);
    var config = {
      method: "patch",
      url: url,
      headers: {
        Authorization: `Bearer ${token.replaceAll('"', "")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({ members: arr }),
    };
    const res = await axios(config);
    console.log(res.data);
    setMembers(list);
    navigation.goBack();
  };
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setData(originalData); // Set the original unfiltered data when the search query is cleared
    }
    const filteredData = originalData.filter((element) =>
      element.name.toLowerCase().includes(text.toLowerCase())
    );
    setData(filteredData);
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
              autoCorrect={false}
              onChangeText={handleSearch}
              value={searchQuery}
            />

            <FlatList
              style={styles.flatlist}
              data={data}
              keyExtractor={({ _id }) => _id}
              renderItem={({ item }) => (
                <View style={styles.item}>
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
                    value={item.isGroupChecked}
                    onValueChange={(newValue) => {
                      const updatedData = data.map((dataItem) => {
                        if (dataItem._id === item._id) {
                          return { ...dataItem, isGroupChecked: newValue };
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
} 
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
