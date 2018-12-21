import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView } from 'react-native';
import ScrollViewClothes from "../scrollViewClothes/scrollViewClothes"
import { mockCategorias } from "../../mock"

class ScrollViewExample extends Component {

   state = {
    categorias: mockCategorias
   }
   render() {
      return (
        <View>
          {
            this.state.categorias.map((categoria, index) => (
              <View key={index}>
                <Text style={styles.categoryText}>{categoria.categotia}</Text>
                <ScrollViewClothes clothes={categoria.roupas}/>
              </View>
            ))
          }
        </View>
      )
   }
}
export default ScrollViewExample

const styles = StyleSheet.create ({
  categoryText: {
    fontSize: 24
  }
})
