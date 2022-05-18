import {gql} from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
    edges {
      node {
        id
        ownerName
        name
        createdAt,
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        watchersCount
        forksCount
        openIssuesCount
        url
        ownerAvatarUrl
        description
        language
        userHasReviewed
      }
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
`;

export const GET_ME = gql`
query Me {
  me {
    id
    username
    reviews {
      edges {
        node {
          id
          repository {
            id
            fullName
          }
          repositoryId
          rating
          createdAt
          text
        }
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query Repository($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          user {
            id
            username
          }
          createdAt
          text
          rating
        }
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
    id
    ownerName
    name
    createdAt
    fullName
    reviewCount
    ratingAverage
    stargazersCount
    watchersCount
    forksCount
    openIssuesCount
    url
    ownerAvatarUrl
    description
    language
    userHasReviewed
  }
}
`;