import React from "react";
import { Link, useHistory } from "react-router-dom";

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
    <main className="container--login ">
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div>Email or password was not valid.</div>
        <button
          className="button--close"
          onClick={(e) => invalidDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <section className="mt-40 p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <form className="form--login " onSubmit={handleLogin}>
          <h1 className="block mb-4 font-extrabold text-2xl">uTeachiLearn</h1>
          <h2 className="block mb-4 font-bold text-2xl">Please sign in</h2>
          <fieldset className="mb-4">
            <div>
              <label htmlFor="inputEmail block text-gray-700 text-sm font-bold mb-2">
                Email address
              </label>
            </div>
            <input
              ref={email}
              type="email"
              id="email"
              className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="inputPassword"> Password </label>
            </div>
            <input
              ref={password}
              type="password"
              id="password"
              className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <button className="link--register m-8 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
              <Link to="/register">Not a member yet?</Link>
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  );
};
