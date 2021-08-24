const githubQuery = {
  query: `
           {
        viewer {
         name
        }
        search(query:"user:paulpowang sort:updated-desc", type: REPOSITORY, first: 10){
          nodes{
            ... on Repository{
              name
              description
              id
              url
              viewerSubscription
            }
          }
        }
      }

`,
};

export default githubQuery;
