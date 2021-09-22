import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

export const Register = (props) => {
  const firstName = React.createRef();
  const lastName = React.createRef();
  const email = React.createRef();
  const bio = React.createRef();
  const password = React.createRef();
  const verifyPassword = React.createRef();
  const passwordDialog = React.createRef();
  const image_url = useRef();
  const history = useHistory();
  const [currentPicture, setCurrentPicture] = useState({});
  // const is_teacher = React.createRef();

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createProfileImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      setCurrentPicture(base64ImageString);
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: email.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        bio: bio.current.value,
        email: email.current.value,
        password: password.current.value,
        image_url: currentPicture,
        // is_teacher: is_teacher.current.value,
      };

      return fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((res) => {
          if ("token" in res) {
            localStorage.setItem("uteachilearn_token", res.token);
            history.push("/");
          }
        });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button
          className="button--close"
          onClick={(e) => passwordDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form
        className="form--login bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleRegister}
      >
        <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
        <fieldset>
          <label htmlFor="firstName block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            ref={firstName}
            type="text"
            name="firstName"
            className="form-control shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="First name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input
            ref={lastName}
            type="text"
            name="lastName"
            className="form-control shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Last name"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email address"
            required
          />
        </fieldset>
        {/* <fieldset>
          <label htmlFor="inputImage"> Profile Image </label>
          <input
            ref={image_url}
            type="image_url"
            name="image_url"
            className="form-control shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="profile image"
            required
          />
        </fieldset> */}
        <fieldset>
          <input
            type="file"
            id="image_url"
            ref={image_url}
            onChange={createProfileImageString}
          />
          {/* <input type="hidden" name="image" /> */}
          {/* <button
            onClick={() => {
              // Upload the stringified image that is stored in state
            }}
          >
            Upload
          </button> */}
        </fieldset>
        <fieldset>
          <label htmlFor="inputPassword"> Password </label>
          <input
            ref={password}
            type="password"
            name="password"
            className="form-control shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"> Verify Password </label>
          <input
            ref={verifyPassword}
            type="password"
            name="verifyPassword"
            className="form-control shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Verify password"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"> Bio </label>
          <textarea
            ref={bio}
            name="bio"
            className="form-control shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Let other users know a little bit about you..."
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
            Register
          </button>
        </fieldset>
      </form>
      <section className="link--register m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
        Already registered? <Link to="/login">Login</Link>
      </section>
    </main>
  );
};
