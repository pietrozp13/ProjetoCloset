import gql from "graphql-tag";

export const ALL_ROUPAS_QUERY = gql`
query content($where: NroupaWhereInput) {
    nroupas: nroupasConnection(where: $where, orderBy: createdAt_DESC) {
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