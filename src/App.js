import "./App.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BASE_URL = "http://hn.algolia.com/api/v1/";

function request(query) {
  return fetch(`${BASE_URL}search?query=${query}`, {}).then((res) =>
    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  );
}

function App() {
  const dispatch = useDispatch();
  let currentTerm = React.createRef();
  let terms = useSelector((state) => state.terms);
  let results = useSelector((state) => state.results);

  // async for await data processing
  async function handleClick() {
    let searchResults = await request(currentTerm.current.value);
    console.log(searchResults);
    await dispatch({
      type: "add_term",
      term: currentTerm.current.value,
    });
    await dispatch({
      type: "search",
      results: searchResults,
    });
  }

  return (
    <div className="App">
      <h2>Hacker News React</h2>
      <div style={{ marginBottom: "20px" }}>
        Terms searched: {terms.join(", ")}
      </div>
      <div className="search-contain">
        <input
          ref={currentTerm}
          className="search-query"
          name="search-query"
          type="text"
        ></input>
        <input
          className="search-button"
          type="button"
          value="Search!"
          onClick={handleClick}
        ></input>
      </div>
      {/* RESULTS GO HERE */}
      {results.length > 0
        ? results.map((result, i) => {
            return (
              <a key={i} href={result.url}>
                <div className="search-result">
                  <div className="result-points">{result.points}</div>
                  <div className="result-title">{result.title}</div>
                  {/* <ul className="result-tags">
                      {result._tags.map((tag, i) => {
                        return(
                          <li key={i} className="result-tag">
                            {tag}
                          </li>
                        )
                      })}
                  </ul> */}
                </div>
              </a>
            );
          })
        : ""}
    </div>
  );
}

export default App;
