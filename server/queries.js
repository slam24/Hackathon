var infolayout = `
query {
  organization(login: "IHack2018") {
    name,
    url,
    teams(first:10) {
      edges {
        node {
          id,
          name
        }
      }
    }
  }
}`

var infodashboard = `
query {
  organization(login: "IHack2018") {
    name,
    url,
    teams(first:10) {
      totalCount,
      edges {
        node {
          id,
          name,
          description,
          members(first: 10){
            totalCount,
            edges{
              node{
                login,
                name,
                email,
                avatarUrl
              }
            }
          },
          repositories(first:10){
            totalCount,
            edges{
              node{
                id,
                name,
                url,
                description,
                descriptionHTML,
                ref(qualifiedName: "master") {
                  target {
                    ... on Commit {
                      additions,
                      history(first: 1) {
                        totalCount
                        edges {
                          node {
                            oid
                            messageHeadline,
                            committedDate,
                            deletions,
                            additions,
                            committer {
                              avatarUrl,
                              email,
                              name
                            }
                          }
                        }
                      }
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
                }
              }
            }
          }
        }
      }
    }
  }
}`

var initialQuery = `
query {
  organization(login: "IHack2018") {
    name,
    url,
    teams(first:10) {
      totalCount,
      edges {
        node {
          id,
          name,
          description,
          members(first: 10){
            totalCount,
            edges{
              node{
                login,
                name,
                email,
                avatarUrl
              }
            }
          },
          repositories(first:10){
            edges{
              node{
                id,
                name,
                url,
                description,
                descriptionHTML,
                ref(qualifiedName: "master") {
                  target {
                    ... on Commit {
                      additions,
                      history(first: 1) {
                        totalCount
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
                languages(first: 10){
                  edges{
                    node{
                      id,
                      color,
                      name
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

var initialQuery1 = `
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

export default { infolayout, infodashboard };