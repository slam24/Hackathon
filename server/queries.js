function infolayout(organization){
  return `
  query {
    organization(login: "${organization}") {
      name,
      url,
      teams(first:10) {
        edges {
          node {
            id,
            name,
            slug,
            repositories(first:10){
              totalCount,
              edges{
                node{
                  name
                }
              }
            }
          }
        }
      }
    }
  }`
}

function infoteam(slug, organization){
  return  `
  query {
    organization(login: "${organization}") {
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

function infodashboard(organization){
  return `
  query {
    organization(login: "${organization}") {
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
}

function getGraph(repo, first = null, last = null, after = null, before = null, organization){
  if (String(after) != 'null') after = '"'+after+'"'
  if (String(before) != 'null') before = '"'+before+'"'
  return `
  query {
    repository(name: "${repo}", owner: "${organization}") {
      ref(qualifiedName: "master") {
        id,
        target {
          ... on Commit {
            id,
            history(first: ${first} last: ${last} after:${after} before:${before}) {
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
                  },
                  pushedDate
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