import classes from "./Login.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "../redux/logSlice";
import { post } from "../api/Api";

function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);

  const usernameInputHandler = (event) => {
    setUsernameInput(event.target.value);
  };
  const passwordInputHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  const loginHandler = async () => {
    let resp = await post("http://34.245.213.76:3000/auth/signin", {
      username: usernameInput,
      password: passwordInput,
    });

    try {
      if (resp.error == false) {
        if (resp.message.error == "Unauthorized") {
        } else {
          console.log(resp.message.accessToken);
          dispatch(
            logActions.Access({
              value: resp.message.accessToken,
            })
          );
          dispatch(
            logActions.login({
              value: true,
            })
          );
        }
      } else {
      }
    } catch (e) {
      console.log(e);
    }

    setUsernameInput("");
    setPasswordInput("");

    console.log(user);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.FormContainer}>
      <div className={classes.title}>
        <h1>Login</h1>
      </div>
      <form onSubmit={formSubmitHandler}>
        <div className={classes["input-container"]}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              className={classes.input}
              placeholder="Username"
              type="text"
              id="username"
              value={usernameInput}
              onChange={usernameInputHandler}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>

            <input
              className={classes.input}
              placeholder="Password"
              type="password"
              id="password"
              value={passwordInput}
              onChange={passwordInputHandler}
              onBlur={() => setIsTouched(true)}
            />

            {isTouched && passwordInput !== "P@ssw0rd" ? (
              <p className={classes.error}>Please enter a valid password!</p>
            ) : (
              ""
            )}
          </div>
          <button
            disabled={
              usernameInput !== "Candidate" && passwordInput !== "P@ssw0rd"
            }
            className={classes["login-btn"]}
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
