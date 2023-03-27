import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput} from "react-native";
import {StatusBar} from "expo-status-bar";
import {STRINGS} from "../../assets/constants/strings";
import {COLORS} from "../../assets/constants/colors";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {useRef, useState} from "react";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddExpense({navigation}) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    function pickImage() {

    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"/>
            <View style={styles.bottomSheet}>
                <View style={styles.compTitle}>
                    <Text style={styles.compTitleStyle}>{STRINGS.ADD_EXPENSE}</Text>
                </View>
                <View style={{height: '100%'}}>
                    <View style={[styles.firstContainer, styles.elevation]}>
                        <View style={styles.view2}>
                            <Text style={styles.text2}>Split Among</Text>
                            <View style={styles.view4}>
                                <ScrollView style={styles.view3} horizontal={true}>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                    {/* <TouchableOpacity onPress={handleSplitAmount}> */}

                                    {/* </TouchableOpacity> */}
                                </ScrollView>
                                <TouchableOpacity style={styles.view1}>
                                    <Ionicons name='add-circle' size={40} color='black'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.view2}>
                            <Text style={styles.text2}>Expense Details</Text>
                            <View style={styles.des1}>
                                <TextInput style={styles.input}
                                           placeholder='Enter a description' name="desc"/>
                                {/* onChangeText={(text) => setDesc(text)} */}
                            </View>
                            <View style={styles.des1}>
                                <TextInput style={styles.input}
                                           placeholder='Amount' name="amt"/>
                                {/* onChangeText={(text) => setAmt(text)} */}
                            </View>
                        </View>
                        <View style={styles.view2}>
                            <Text style={styles.text2}>Paid By</Text>
                            <View style={styles.view4}><ScrollView style={styles.view3} horizontal={true}>
                                <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                                <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}}></Image>
                            </ScrollView>
                                <TouchableOpacity style={styles.view1}>
                                    <Ionicons name='add-circle' size={40} color='black'/>
                                </TouchableOpacity></View>
                        </View>
                        <View style={[styles.desre, {marginTop:20}]}>
                            <TouchableOpacity style={styles.view5} onPress={pickImage}>
                                <Text style={styles.textRe}>Add a receipt</Text>
                                <Ionicons name='add-circle' size={40} color='black'/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.desre}>
                            <TouchableOpacity style={styles.view5} onPress={showDatePicker}>
                                <Text style={styles.textRe}>Add a date</Text>
                                <Ionicons name='add-circle' size={40} color='black'/>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                isDarkModeEnabled={false}/>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
        ;
};

const styles = StyleSheet.create({
    bottomSheet: {
        height: '100%', //change this after design it
        backgroundColor: COLORS.BG, width: '100%', borderTopEndRadius: 50, borderTopStartRadius: 50, marginTop: 10
    }, container: {
        paddingTop: 10, backgroundColor: COLORS.PRIMARY,
    }, compTitle: {
        marginTop: 30, justifyContent: "center", alignItems: "left", marginHorizontal: 30,
    }, compTitleStyle: {
        fontWeight: 'bold', fontSize: 25
    }, firstContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'column',
    },
    view1: {
        marginLeft: 20,
        margin: 10,
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
        marginTop: 10,
        fontSize: 16,
    }, view2: {
        width: '100%',
        flexDirection: 'column',
    }, view3: {
        width: '80%',
        flexDirection: 'row',
    }, view4: {
        width: '100%',
        flexDirection: 'row',
    },
    elevation: {
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 1},
        elevation: 1,
        shadowOpacity: 0.4,
    }, firstContainer2: {
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
    }, input: {
        marginTop: 10,
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10
    }, desre: {
        flexDirection: 'row',
        marginLeft: 15,
        justifyContent: "flex-end"
    }, textRe: {
        //textAlign:'center',
        fontSize: 16,
        marginRight: 15
    }, con: {
        paddingLeft: '50%',
    }, view5: {
        flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center',
    }

});