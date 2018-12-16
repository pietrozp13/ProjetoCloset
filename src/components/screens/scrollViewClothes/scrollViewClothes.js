import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView } from 'react-native';

export default class ScrollViewClothes extends Component {
   render() {
      return (
         <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
               {
                  this.props.clothes.map((item) => (
                     <View key = {item.id} style = {styles.item}>
                        <Image
                            style={{width: 130, height: 130, borderRadius: 20, }}
                            source={item.img}
                        />
                        <Text style={styles.text}>{item.name}</Text>
                     </View>
                  ))
               }
            </ScrollView>
         </View>
      )
   }
}

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
        backgroundColor: '#d2f7f1',
        height: 130,
        width: 130,
        shadowColor: "#000",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        borderRadius: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'space-between',
        top: "-25%",
        color: '#757575',
        backgroundColor: "#fff",
        width: 100,
        borderColor: '#2a4944',
        borderWidth: 1
    }
})
