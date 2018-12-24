import React, { Component } from 'react';
import { Text, Button, View, StyleSheet, ScrollView } from 'react-native';
import ScrollViewClothes from "../scrollViewClothes/scrollViewClothes"

class ScrollViewExample extends Component {
   render() {
      return (
        <View>
          <Text style={styles.categoryText}>Roupas</Text>
          <ScrollViewClothes clothes={this.props.data.nroupas.edges}/>
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
