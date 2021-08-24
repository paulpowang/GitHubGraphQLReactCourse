import github from "./db";
import { useEffect, useState, useCallback } from "react";
import query from "./Query";
import RepoInfo from "./RepoInfo";
import SearchBox from "./SearchBox";

function App() {
  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setQueryString] = useState("slides");
  let [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(query(pageCount, queryString));

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((response) => response.json)
      .then((data) => {
        const viewer = data.data.viewer;
        const repo = data.data.search.nodes;
        const total = data.data.search.repositoryCount;
        setUserName(viewer.name);
        setRepoList(repo);
        setTotalCount(total);
      })
      .catch((error) => console.log(error));
  }, [pageCount, queryString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i>
        Repos
      </h1>
      <p>Hey there {userName}</p>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onQueryChange={(myString) => {
          setQueryString(myString);
        }}
        onTotalChange={(myTotal) => {
          setPageCount(myTotal);
        }}
      />
      <p>
        <b>Search For:</b>
        {queryString} |<b>Items per page:</b>
        {pageCount} |<b>Total Results:</b>
        {totalCount}
      </p>
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
            <RepoInfo key={repo.id.toString()} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
