import React, { useState, useEffect } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
const Home = () => {
  const [Input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, SetsearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";

  useEffect(() => {
    console.log("use effect run");
    return () => {
      console.log("exit");
    };
  }, []);

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=
    =${Input}`).then((result) => {
      setResults(result);
    });
  };
  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const onRadioChange = (ev) => {
    SetsearchOption(ev.target.value);
  };
  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Result</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for Something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={Input}
      />

      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="show"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            checked={!isShowsSearch}
            value="people"
            onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
