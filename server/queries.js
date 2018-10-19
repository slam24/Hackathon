var initialQuery = `
query {
  organization(login: "IHack2018") {
    name,
    url,
    teams(first:10) {
      edges {
        node {
          name,
          description,
          members(first: 10){
            edges{
              node{
                name,
                email,
                avatarUrl,
                pullRequests(first: 10){
                  totalCount
                }
              }
            }
          },
          repositories(first:10){
            edges{
              node{
                name,
                description,
                descriptionHTML,
                collaborators(first: 10){
                  totalCount,
                  edges{
                    node{
                      name,
                      email,
                      avatarUrl
                    }
                  }
                },
                languages(first: 10){
                  edges{
                    node{
                      id,
                      color,
                      name
                    }
                  }
                },
                ref(qualifiedName: "master") {
                  target {
                    ... on Commit {
                      additions,
                      history(last: 10) {
                        edges {
                          node {
                            oid
                            messageHeadline
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`

var testQuery =  `
query {
  viewer {
    login
    name
    url
  },
  organization(login: "IHack2018") {
    name,
    url,
    teams(first:1) {
      edges {
        node {
          name,
          description,
          repositories(first:1){
            edges{
              node{
                name,
                description,
                ref(qualifiedName: "master") {
                  target {
                    ... on Commit {
                      additions,
                      history(first: 1) {
                        edges {
                          node {
                            oid
                            messageHeadline
                          }
                        }
                      }
                    }
                  }
                },
                owner{
                  login
                  id
                  __typename
                  url
                },
                assignableUsers{
                  totalCount
                },
                languages(first: 10){
                  edges{
                    node{
                      id,
                      color,
                      name
                    }
                  }
                },
                pushedAt
              }
            }
          }
        }
      }
    }
  }
}`;

export { initialQuery, testQuery };