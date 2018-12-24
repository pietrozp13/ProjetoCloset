import gql from "graphql-tag";

export const POST_MUTATION2 = gql`
  mutation createNroupa($descricao: String, $categoria: String, $cor: String, $imgUrl: String){ 
    createNroupa(
      data: {
        descricao: $descricao,
        categoria: $categoria,
        cor: $cor,
        imgUrl: $imgUrl
    }
    ){
      id
      descricao
      cor
      categoria
    }
  }
`

export const ALL_ROUPAS_QUERY = gql`
query content($where: NroupaWhereInput, $orderBy: NroupaOrderByInput) {
    nroupas: nroupasConnection(where: $where, orderBy: $orderBy) {
      edges {
        node {
          descricao
          categoria
          cor
          roupas {
            categorias
          }
          imgUrl
        }
      }
    }
  }
`