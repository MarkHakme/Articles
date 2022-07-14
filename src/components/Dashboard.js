import classes from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "../redux/logSlice";
import { useEffect } from "react";
import { get } from "../api/Api";

function Dashboard() {
  let url = "https://static01.nyt.com/";

  const AccessToken = useSelector((state) => state.login.AccessToken);

  const results = useSelector((state) => state.login.results);
  console.log(results);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);
  const searchArticles = useSelector((state) => state.login.searchArticles);

  const logoutHandler = () => {
    dispatch(
      logActions.login({
        value: false,
      })
    );

    console.log(user);
  };

  useEffect(() => {
    FetchData();
  }, []);
  const FetchData = async () => {
    let resp = await get(
      "http://34.245.213.76:3000/articles?page=1",
      AccessToken
    );

    dispatch(
      logActions.getResults({
        value: resp.message.response.docs,
      })
    );
  };
  const search = (value) => {
    dispatch(
      logActions.searchArticles({
        value: value,
      })
    );
  };
  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <input
          onChange={(e) => {
            console.log(e.target.value);
            search(e.target.value);
          }}
          className={classes.input}
          type="text"
          placeholder="Search"
        />

        <button className={classes["search-btn"]}>Search</button>
      </div>

      <h2>Articles</h2>
      {results.map((result, index) => {
        return (
          <>
            <div className={classes.results} key={index}>
              <h4>{result.abstract}</h4>
              <img
                className={classes.image}
                src={
                  result.multimedia[0] == undefined
                    ? require("../images/placeholder.jpg")
                    : url.concat(result.multimedia[0].url)
                }
              />
              <p>{result.lead_paragraph}</p>
              <p className={classes.author}>{result.byline.original}</p>
            </div>
          </>
        );
      })}

      <button onClick={logoutHandler} className={classes["logout-btn"]}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
