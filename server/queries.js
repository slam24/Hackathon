var infolayout = `
query {
  organization(login: "IHack2018") {
    name,
    url,
    teams(first:10) {
      edges {
        node {
          id,
          name,
          slug
        }
      }
    }
  }
}`

function infoteam(slug){
  return  `
  query {
    organization(login: "IHack2018") {
      team(slug: "${slug}") {
        members(first: 10){
          totalCount,
          edges{
            node{
              login,
              name,
              email,
              avatarUrl,
              bio,
              url,
              createdAt
            }
          }
        },
        repositories(first:10){
          totalCount,
          edges{
            node{
              name,
              url,
              description,
              updatedAt,
              languages(first: 10){
                edges{
                  node{
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
  }`
}

var infodashboard = `
query {
  organization(login: "IHack2018") {
    teams(first:10) {
      totalCount,
      edges {
        node {
          members(first: 10){
            totalCount
          },
          repositories(first:10){
            totalCount,
            edges{
              node{
                name,
                url
                ref(qualifiedName: "master") {
                  target {
                    ... on Commit {
                      additions,
                      history(first: 1) {
                        totalCount
                        edges {
                          node {
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

function getGraph(first = 10, after = null, before = null){
  return `
  query {
    repository(name: "Caribbean-Digital2", owner: "IHack2018") {
      ref(qualifiedName: "master") {
        id,
        target {
          ... on Commit {
            id,
            history(first: ${first} after:${after} before:${before}) {
              totalCount,
              pageInfo {
                startCursor,
                hasNextPage,
                endCursor
              }
              edges {
                node {
                  additions,
                  messageHeadline
                  oid
                  message
                  author {
                    name
                    email
                    date
                  }
                },
                cursor
              }
            }
          }
        }
      }
    }
  }`
}

module.exports = {
    infolayout:infolayout,
    infodashboard:infodashboard,
    infoteam: infoteam,
    getGraph: getGraph
}