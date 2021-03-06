import React from 'react';
import { Button, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';
import { Mutation } from 'react-apollo';
import { ALL_ROUPAS_QUERY, POST_MUTATION2 } from '../addClothe/addClotheGraph'
import { mockBase } from "../../mock"
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';
import { graphql } from 'react-apollo';


const Form = t.form.Form;

let Categorias = t.enums({
    Tenis: "Tenis",
    Camisa: "Camisas"
});

const ClotheInfo = t.struct({
    descricao: t.String,
    categotia: Categorias,
    cor: t.String
});

const valueForm = {
    descricao: '',
    categotia: 'Camisa',
    cor: '',
};

class AddClothe extends React.Component {
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

  async handleSubmit (createNroupa, photo) {
    let value = this.form.getValue();
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    firebase.storage().ref().child('images/' + value.descricao).put(blob).then(function(snapshot) {
      snapshot.ref.getDownloadURL().then(function(url) {
        createNroupa({ variables: {descricao: value.descricao, categoria: value.categotia, cor: value.cor, imgUrl: url}})
      });
    }).catch(function(error) {
      console.error('Upload failed:', error);
    });
  }


  mutationPost (photo) {
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
      <Mutation mutation={POST_MUTATION2}>
      {(createNroupa, { data }, loading, error) => {
        if (loading) return (<Text>Loading...</Text>);
        if (error) return (<Text>Error! {error.message}</Text>);
        return (
          <View style={styles.form}>
            <Form 
              ref={c => this.form = c}
              type={ClotheInfo}
              value={valueForm}
            />
            <Button
              title="New Clothe 🎉"
              onPress={()=> this.handleSubmit(createNroupa, photo)}
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
    this.props.navigation.navigate('Camera', { txt: this.state.value })
  }

  
  render() {
    let photo = this.props.navigation.getParam('img', false)
    return (
      <View style={styles.container}>
        <View style={styles.containerImg}>
          <TouchableOpacity 
            style={styles.buttonClick}
            onPress={() => this.props.navigation.navigate('Camera', { testeFunc: this.setTeste.bind(this), teste: this.state.teste })}
          >
            {
              photo ?
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
          {this.mutationPost(photo)}
        </View>
      </View>
    );
  }
}

export default graphql(POST_MUTATION2, {
  options: {
    update: (proxy, { data: { createNroupa } }) => {
      const data = proxy.readQuery({ ALL_ROUPAS_QUERY });
      data.nroupas.push(createNroupa);
      proxy.writeQuery({ ALL_ROUPAS_QUERY, data });
    },
  },
})(AddClothe);

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