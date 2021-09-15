import React from "react";
import { Link, useHistory } from "react-router-dom";
// import "./Auth.css";

export const Login = (props) => {
  const email = React.createRef();
  const password = React.createRef();
  const invalidDialog = React.createRef();
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: email.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("uteachilearn_token", res.token);
          history.push("/");
        } else {
          invalidDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div>Email or password was not valid.</div>
        <button
          className="button--close"
          onClick={(e) => invalidDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <section>
        <form className="form--login " onSubmit={handleLogin}>
          <h1>uTeachiLearn</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="inputEmail block text-gray-700 text-sm font-bold mb-2">
              Email address
            </label>
            <input
              ref={email}
              type="email"
              id="email"
              className="form-control  shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
              ref={password}
              type="password"
              id="password"
              className="form-control  shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              required
            />
          </fieldset>
          <fieldset
            style={{
              textAlign: "center",
            }}
          >
            <button
              className="m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              type="submit"
            >
              Sign In
            </button>
          </fieldset>
        </form>
      </section>
      <section className="link--register m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
