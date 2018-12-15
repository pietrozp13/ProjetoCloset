import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView } from 'react-native';
import img from "../mainScreen/roupa.jpg"
const photo = img

class ScrollViewExample extends Component {

   state = {
      names: [
         {'name': 'Ben', 'id': 1},
         {'name': 'Susan', 'id': 2},
         {'name': 'Robert', 'id': 3},
         {'name': 'Mary', 'id': 4},
         {'name': 'Daniel', 'id': 5},
         {'name': 'Laura', 'id': 6},
         {'name': 'John', 'id': 7},
         {'name': 'Debra', 'id': 8},
         {'name': 'Aron', 'id': 9},
         {'name': 'Ann', 'id': 10},
         {'name': 'Steve', 'id': 11},
         {'name': 'Olivia', 'id': 12},
         {'name': 'Aron', 'id': 13},
         {'name': 'Ann', 'id': 14},
         {'name': 'Steve', 'id': 15},
         {'name': 'Olivia', 'id': 16}
      ]
   }
   render() {
      return (
         <View>
            <Text style = {styles.categoryText}>Camisetas</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
               {
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = {styles.item}>
                        <Image
                            style={{width: 130, height: 130 }}
                            source={photo}
                        />
                        <Text style = {styles.text}>{item.name}</Text>
                     </View>
                  ))
               }
            </ScrollView>
         </View>
      )
   }
}
export default ScrollViewExample

const styles = StyleSheet.create ({
  categoryText: {
    fontSize: 24
  },
   item: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 0,
      margin: 5,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1',
      height: 130
   },
   text: {
    position: "relative",
    alignItems: 'center',
    top: "-20%",
    color: '#fff',
  }
})
