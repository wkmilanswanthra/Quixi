import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    ActivityIndicator
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../../assets/constants/Colors";
import {useEffect, useState} from "react";
import Axios from "axios"
import {GROUP_ROUTES} from "../../assets/constants/routes";
import * as SecureStore from "expo-secure-store";
import {getToken} from '../../services/TokenValidator'

export default function Groups({navigation}) {
    const [list, setList] = useState({})
    const [userId, setUserId] = useState('')
    const [token, setToken] = useState('')


    useEffect(() => {
        async function fetchData() {
            await getUserId();
            await getToken();
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (userId && token) {
            getGroupList();
        }
    }, [userId, token]);


    const getGroupList = async () => {
        const url = GROUP_ROUTES.FIND + '/' + userId.replaceAll('"', '');
        console.log(url, '\n\n')
        let config = {
            method: 'get',
            url: url,
            headers: {
                Authorization: token,
            },
        };

        Axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setList(response.data)
            })
            .catch(function (error) {
                console.log(error.response.message);
            });
    }
    const getUserId = async () => {
        const userId = await SecureStore.getItemAsync('userId');
        setUserId(userId);
    }
    const getToken = async () => {
        const token = await SecureStore.getItemAsync('token');
        setToken(token);
    }

    function handlePress(id) {
        console.log(id)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"/>
            <View style={styles.bottomSheet}>
                <View style={{height: '100%'}}>
                    <ScrollView style={styles.scrollView}>
                        {list.groups && list.groups.map((group, index) => (
                            <TouchableOpacity key={index} onPress={() => handlePress(group._id)} style={styles.groupSlot}>
                                <View style={styles.membersImageRow}>
                                    <Image style={[styles.image, styles.image1]}
                                           source={{uri: 'https://picsum.photos/id/100/200/200'}}/>
                                    <Image style={[styles.image, styles.image2]}
                                           source={{uri: 'https://picsum.photos/id/101/200/200'}}/>
                                    <Image style={[styles.image, styles.image3]}
                                           source={{uri: 'https://picsum.photos/id/102/200/200'}}/>
                                </View>
                                <View style={styles.groupRowDetail}>
                                    <Text style={styles.groupName}>{group.name}</Text>
                                    <Text style={styles.groupOwe}>You owe</Text>
                                </View>
                                <View style={styles.groupRowDetail}>
                                    <Text style={styles.groupCreatedBy}>Group created by</Text>
                                    <Text style={styles.groupCreatedBy}> ff</Text>
                                    <Text style={styles.groupBalance}> 3000.00</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.endTextContainer}>
                            <Text style={styles.endText}> End of groups list </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>);
};

const styles = StyleSheet.create({
    bottomSheet: {
        height: '100%', //change this after design it
        backgroundColor: COLORS.BG,
        width: '100%',
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        marginTop: 10
    },
    container: {
        paddingTop: 10,
        backgroundColor: COLORS.PRIMARY,
    },
    groupSlot: {
        backgroundColor: 'white',
        height: 110,
        width: '85%',
        marginTop: 20,
        marginHorizontal: 30,
        borderRadius: 20
    },
    scrollView: {
        marginTop: 10,
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        marginBottom: 60
    },
    groupRowDetail: {
        flexDirection: 'row'
    },
    groupName: {
        marginLeft: 20
    },
    groupOwe: {
    },

    groupCreatedBy: {
        marginLeft: 20,
    },

    groupBalance: {
        marginLeft: 90,
    },

    membersImageRow: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', // position: 'relative',
        marginLeft: 20, marginTop: 10
    },

    image: {
        width: 50, height: 50, borderRadius: 50, borderWidth: 2, borderColor: 'white', position: 'absolute',
    },

    image1: {
        top: 0, left: 0, zIndex: 1,
    },

    image2: {
        top: 0, left: 20, zIndex: 2,
    },

    image3: {
        top: 0, left: 40, zIndex: 3,
    }, endTextContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    endText: {
        color: COLORS.GREY,
    }

});