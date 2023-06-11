import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie} from "victory-native";  //import library for design graphs

const data = [
    { category: "Category A", value: 12 },
    { category: "Category B", value: 15 },
    { category: "Category C", value: 10 },
    { category: "Category D", value: 20 },
    { category: "Category E", value: 8 },
  ];

  const databar = [
    { category: "Category A", value: 12 },
    { category: "Category B", value: 15 },
  
  ];

const Graph=({navigation})=>{
    
    return(

        <View style={styles.containerWhite}>
            <StatusBar style="light" />

            <Text style={styles.graphTitle}>Owing & Debt</Text>

            <VictoryChart height={250}  domainPadding={{ x: 100 }}  theme={VictoryTheme.material}>
                <VictoryBar style={{data:{fill:"#5C6CF8"}}} data={databar} x="category" y="value"/>
            </VictoryChart>

            <Text style={styles.graphTitle}>Owing & Debt</Text>

            <VictoryPie height={330}  theme={VictoryTheme.material} data={data.slice(0,5)}  x="category" y="value" 
              colorScale={["#3333ff", "#4d4dff", "#6666ff", "#8080ff", "#9999ff", "#b3b3ff","#ccccff"]} />

        </View>
         
         
    )

    
}
export default Graph

export const styles = StyleSheet.create({

//   ###############Styles for page layout################

    containerWhite:{
        flex: 1,
        backgroundColor: 'white',
      },

//###Specific styles for screen### 

    graphTitle:{
        marginTop:30,
        marginLeft:30,
        fontWeight:'bold',
        fontSize:20
      },
  

})