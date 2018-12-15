import React from 'react';
import { Button, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9';
import { Query, Mutation } from 'react-apollo';
import { POSTS_QUERY, POST_MUTATION } from '../addClothe/addClotheGraph'

const Form = t.form.Form;

let Categorias = t.enums({
    T: "Tenis",
    C: "Camisas"
});

const ClotheInfo = t.struct({
    descricao: t.String,
    categotia: Categorias,
});

const ClotheCar = t.struct({
  cor: t.String,
});

const value = {
    descricao: 'Camisa Preta',
    categotia: 'C',
    cor: 'A',
};

export default class AddClothe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        idPost: undefined,
        photo: null,
        teste: "abc"
    };
  }

  setQuery(data) {
    let id = data ? data.create_post : null
    this.setState({
      idPost: id
    })
  }

  setPhoto (photoURI) {
    this.setState({
    photo: photoURI
    })
  }

  setTeste () {
    this.setState({
        teste: "pao"
    })
  }

  handleSubmit = (createPost, data) => {
    const value = this.form.getValue();
    createPost({ variables: {title: value.title, body: value.body, userId: value.userId }})
  }
  

  mutationPost () {
  var _ = require('lodash');

  const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

  stylesheet.fieldset = {
    flexDirection: 'row',
  };
  stylesheet.formGroup.normal.flex = 1;
  stylesheet.formGroup.error.flex = 1;

  stylesheet.formGroup.normal.paddingLeft = 20
  stylesheet.formGroup.normal.paddingRight = 20

  stylesheet.formGroup.error.paddingLeft = 20
  stylesheet.formGroup.error.paddingRight = 20

  const options = {
    stylesheet: stylesheet
  };
    return(
      <Mutation mutation={POST_MUTATION}>
      {(createPost, { data }, loading, error) => {
        if (loading) return (<Text>Loading...</Text>);
        if (error) return (<Text>Error! {error.message}</Text>);
        return (
          <View style={styles.form}>
            <Form 
              ref={c => this.form = c}
              type={ClotheInfo}
              value={value}
            />
            <Form 
              ref={c => this.form = c}
              type={ClotheCar}
              value={value}
              options={options}
            />
            <Button
              title="New Clothe 🎉"
              onPress={()=> this.handleSubmit(createPost)}
            />
          </View>
        )}
      }
    </Mutation>
    )
  }

  teste () {
    const value = this.form.getValue()
    this.setState({value: value})
    console.log(value)
    this.props.navigation.navigate('Camera', { txt: this.state.value })
  }
  
  render() {
    let photo = this.props.navigation.getParam('img', 'null')
    return (
      <View style={styles.container}>
        <View style={styles.containerImg}>
          <TouchableOpacity style={styles.buttonClick} onPress={() => this.props.navigation.navigate('Camera', { testeFunc: this.setTeste.bind(this), teste: this.state.teste })}>
            {
              photo.uri ?
            <Image
                style={{width: 280, height: 280 }}
                source={{uri: photo.uri }}
            /> :
            <View style={styles.containerImgAdd}>
              <Text style={{fontSize: 200, marginTop: -50}}>+</Text>
              <Text style={{fontSize: 26, marginTop: -30}}>Add clothe</Text>
            </View>
            }
          </TouchableOpacity>
        </View>
        <View style={styles.containerForm}>
          {this.mutationPost()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  containerImg: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  containerForm: {
    justifyContent: 'center',
    marginTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff',
  },
  containerImgAdd: {
    borderColor: '#dddddd',
    borderWidth: 5,
    height: 280,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonClick: {
    backgroundColor: 'white'
  }
});

/*
title="Camera 📷 👗"
 onPress={() => this.props.navigation.navigate('Camera', { testeFunc: this.setTeste.bind(this), teste: this.state.teste })}
*/