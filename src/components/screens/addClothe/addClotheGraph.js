import gql from "graphql-tag";

export const POSTS_QUERY =  gql`
  query Post($id: Int!) {
      post(id: $id) {
        title
        body
        id
      }
    }
  `

export const POST_MUTATION = gql`
  mutation create_post($title: String, $body: String, $userId: Int!){
    create_post(title: $title, body: $body, user_id: $userId){
      id
      title
    }
  }
`

export const POST_MUTATION2 = gql`
  mutation createNroupa($descricao: String, $categoria: String, $cor: String, $base64: String){ 
    createNroupa(
      data: {
        descricao: $descricao,
        categoria: $categoria,
        cor: $cor,
        base64: $base64
    }
    ){
      id
      descricao
      cor
      categoria
    }
  }
`


/*

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
                  <Image
                    style={{width: 66, height: 58}}
                    source={{uri: data.post.body }}
                  />
                </View>
              );
            }}
          </Query>
          </View>
      )
    } return null 
  }

*/