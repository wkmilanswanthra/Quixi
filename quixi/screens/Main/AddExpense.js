import * as React from 'react';
import {
    Text, View, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, TouchableHighlight
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {STRINGS} from "../../assets/constants/strings";
import {COLORS} from "../../assets/constants/colors";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {useRef, useState, useEffect} from "react";
import * as SecureStore from "expo-secure-store";
import {EXPENSE_ROUTES} from "../../assets/constants/routes";
import Axios from "axios";


export default function AddExpense({navigation}) {

    // Define the initial state variables with the useState hook
    const [userId, setUserId] = useState('')
    const [token, setToken] = useState('')
    const [splitAmong, setSplitAmong] = useState([])
    const [paidBy, setPaidBy] = useState([])
    const [contribution, setContribution] = useState({})

    // Define the useEffect hook, which will fetch the user ID and token when the component mounts
    useEffect(() => {
        async function fetchData() {
            await getToken();
            await getUserId();
            console.log('running useState')
            setContribution([{
                '641f16481459a0e0fffce903': 2000,
                '641f03611459a0e0fffce8fa': 2000,
                '641f02066be6011821263420': 0,
                '641eff829efceb479d11dd8a': 0,
                '641eff1f9efceb479d11dd84': 0
            },])
        }

        fetchData(); // Call the fetchData function when the component mounts
    }, [])

    // Define a function to fetch the user ID from SecureStore and update the state
    const getUserId = async () => {
        const userId = await SecureStore.getItemAsync('userId');
        setUserId(userId);
    }

    // Define a function to fetch the user's token from SecureStore and update the state
    const getToken = async () => {
        const token = await SecureStore.getItemAsync('token');
        setToken(token);
    }

    function pickImage() {

    }

    // Define a function to create an expense using Axios and the API endpoint
    function createExpense() {
        // Check if the contribution object exists
        if (contribution) {
            // Define the API endpoint URL
            const url = EXPENSE_ROUTES.CREATE;
            // Define the Axios configuration object with the necessary headers and data
            const config = {
                method: 'post', url: url, headers: {
                    'Authorization': 'Bearer ' + token.replaceAll('"', ''),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }, data: ({
                    "contribution": JSON.stringify(contribution),
                    "name": "test name",
                    "amount": 4000,
                    "createdBy": userId.replaceAll('"', ''),
                    "splitMethod": 'equal',
                })
            }
            console.log(config)
            // Make a POST request to the API endpoint with the Axios configuration object
            Axios(config).then((response) => {
                console.log('created group = ', response.data)
            }).catch((error) => {
                console.log('create group error = ', error)
            })
        }
    }

    // Define a function to handle the submit button click event
    const handleSubmit = () => {
        console.log('submit click', token, userId)
        if (token && userId) {
            console.log('creating expense')
            createExpense();
        }
    }

    return (<SafeAreaView style={styles.container}>
            <StatusBar style="light"/>
            <View style={styles.bottomSheet}>
                <View style={styles.compTitle}>
                    <Text style={styles.compTitleStyle}>{STRINGS.ADD_EXPENSE}</Text>
                </View>
                <ScrollView style={{height: '100%'}}>
                    <View style={styles.firstContainer}>
                        <View style={styles.view2}>
                            <Text style={styles.text2}>Members</Text>
                            <View style={[styles.view4]}>
                                <ScrollView style={styles.view3} horizontal={true}>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                </ScrollView>
                                <TouchableOpacity style={styles.view1}>
                                    <Ionicons name='add-circle' size={40} color='black' />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.view2, {marginTop: 10}]}>
                            <Text style={styles.text2}>Expense Details</Text>
                            
                                <View style={styles.des1}>
                                    <View style={styles.pencil}>
                                        <FontAwesome name='pencil' size={18} color='black'  />
                                    </View>
                                
                                    <TextInput style={styles.input}
                                            placeholder='Enter a description' name="desc"/>
                                    {/* onChangeText={(text) => setDesc(text)} */}
                                </View>
                            
                            <View style={styles.des1}>
                            <View style={styles.pencil}>
                                        <FontAwesome name='dollar' size={18} color='black'  />
                                    </View>
                                <TextInput style={styles.input}
                                           placeholder='Amount' name="amt"/>
                                {/* onChangeText={(text) => setAmt(text)} */}
                            </View>
                        </View>
                        <View style={[styles.view2, {marginTop: 10}]}>
                            <Text style={styles.text2}>Paid by</Text>
                            <View style={[styles.view4]}>
                                <ScrollView style={styles.view3} horizontal={true}>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                </ScrollView>
                                <TouchableOpacity style={styles.view1}>
                                    <Ionicons name='add-circle' size={40} color='black'/>
                                </TouchableOpacity></View>
                        </View>
                        <View style={styles.split}>
                            <Text style={styles.text2}>Split Methods</Text>
                            <View style={styles.arrow}>
                            <Ionicons name='add-circle' size={30} color='black'/>
                            </View>
                        </View>

                        <View style={[styles.desre, {marginTop: 20}]}>
                            <TouchableOpacity style={styles.view5} onPress={pickImage}>
                                <Text style={styles.textRe}>Add a Date</Text>
                                <Ionicons name='add-circle' size={30} color='black'/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.desre, {marginTop: 20}]}>
                            <TouchableOpacity style={styles.view5} onPress={pickImage}>
                                <Text style={styles.textRe}>Add a receipt</Text>
                                <Ionicons name='add-circle' size={30} color='black'/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.des1}>
                            <View style={styles.pencil} >
                                <Ionicons name="bookmarks-outline" size={20}></Ionicons>
                            </View>
                                <TextInput style={styles.input}
                                           placeholder='Add a comment' name="comment"/>
                                {/* onChangeText={(text) => setAmt(text)} */}
                            </View>
                        <View style={styles.btn}>
                            <TouchableOpacity onPress={handleSubmit}>
                                <Text style={styles.btn1}>
                                    Add
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
    compTitle: {
        marginTop: 30, 
        justifyContent: "center", 
        marginHorizontal: 30,
    }, 
    compTitleStyle: {
        fontWeight: 'bold', 
        fontSize: 25
    }, 
    firstContainer: {
        width: '90%',
        borderRadius: 20,
        marginHorizontal: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 5,
        flexDirection: 'column',
    }, 
    view1: {
        marginLeft: 20, 
        margin: 5, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
    }, 
    img: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 25,
        margin: 10,
    }, 
    text2: {
        marginLeft: 10, 
        color: 'black', 
        fontWeight: "bold", 
        marginTop: 5, 
        fontSize: 16,
    }, 
    view2: {
        width: '100%', 
        flexDirection: 'column',
    }, 
    view3: {
        width: '80%', 
        flexDirection: 'row',
    }, 
    view4: {
        width: '100%', 
        flexDirection: 'row',
    }, 
    elevation: {
        shadowColor: 'black', 
        shadowOffset: {width: 1, height: 1}, 
        elevation: 1, 
        shadowOpacity: 0.4,
    }, 
    firstContainer2: {
        height: 100, 
        width: '90%', 
        backgroundColor: 'white', 
        borderRadius: 15, 
        marginHorizontal: 18, 
        marginTop: 20,
    }, 
    des1: {
        flexDirection: 'row', 
        justifyContent: 'flex-start'
    }, 
    input: {
        marginTop: 5,
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10
    }, 
    desre: {
        flexDirection: 'row', 
        marginLeft: 15, 
        justifyContent: "flex-end"
    }, 
    textRe: {
        //textAlign:'center',
        fontSize: 16, 
        marginRight: 15
    }, 
    con: {
        paddingLeft: '50%',
    }, 
    view5: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 2
    }, 
    btn1: {
        borderWidth: 2, 
        padding: 15, 
        borderColor: 'black', 
        color: 'white', 
        backgroundColor: '#010B40',
    }, 
    btn: {
        alignItems: 'flex-end', 
        marginTop: 10, 
        marginRight: 20, 
        height: 50, 
        marginBottom: 100
    },
    pencil:{
        marginLeft: 1,
        marginTop:20,
        marginRight:5
    },
    split:{
       marginTop:20,
       flexDirection:'row',
       alignItems:'center'
    },
    arrow:{
        marginLeft:'55%'
    }

});