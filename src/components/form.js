import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import gql from "graphql-tag";
import { Query, Mutation } from 'react-apollo';

const Form = t.form.Form;

const POSTS_QUERY =  gql`
  query Post($id: Int!) {
      post(id: $id) {
        title
        body
        id
      }
    }
  `

const POST_MUTATION = gql`
  mutation create_post($title: String, $body: String, $userId: Int!){
    create_post(title: $title, body: $body, user_id: $userId){
      id
      title
    }
  }
`

const User = t.struct({
  title: t.maybe(t.String),
  body: t.String,
  userId: t.Number
});

export default class FormApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {idPost: undefined};
  }

  setQuery(data) {
    let id = data ? data.create_post : null
    this.setState({
      idPost: id
    })
  }

  handleSubmit = (createPost, data) => {
    const value = this.form.getValue();
    createPost({ variables: {title: value.title, body: value.body, userId: value.userId }})
  }

  queryPost (id) {
    if(id){
      return (
        <View>
          <Query query={POSTS_QUERY} variables={{ id }}>
            {({ loading, error, data }) => {
              if (loading) return (<Text>Loading...</Text>);
              if (error) return (<Text>`Error! ${error.message}`</Text>);
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                  <Text>title: {data.post.title}</Text>
                  <Text>id: {data.post.id}</Text>
                  <Text>body: {data.post.body}</Text>
                </View>
              );
            }}
          </Query>
          </View>
      )
    } return null 
  }

  mutationPost () {
    return(
      <Mutation mutation={POST_MUTATION}>
      {(createPost, { data }, loading, error) => {
        if (loading) return (<Text>Loading...</Text>);
        if (error) return (<Text>Error! {error.message}</Text>);
        return (
          <View>
            <Form 
              ref={c => this.form = c}
              type={User}
            />
            <Button
              title="Sign Up!"
              onPress={()=> this.handleSubmit(createPost)}
            />
          {this.queryPost(data ? data.create_post.id : null )}
          </View>
        )}
      }
    </Mutation>
    )
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.mutationPost()}
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
});