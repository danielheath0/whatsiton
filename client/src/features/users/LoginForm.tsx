import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { useState } from "react";
import { loginUser } from "./usersSlice";
import { LoginFormProps } from "../../interfaces/interfaces";

const LoginForm = ({ onLogin }) => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState({
    uName: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const actionResult = await dispatch(loginUser(user));
    if (loginUser.fulfilled.match(actionResult)) {
      const isLoginSuccess = actionResult.payload;
      if (isLoginSuccess) {
        onLogin();
      }
    } else {
      if (actionResult.payload) {
        setErrorMessage(actionResult.payload);
      } else {
        setErrorMessage("An error occurred");
      }
    }}

    return (
      <>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uName">
            Username: 
            <input
              type="text"
              id="uName-login "
              name="uName"
              autoComplete="username"
              value={user.uName}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password: 
            <input
              type="password"
              id="password-login"
              name="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </>
    );
  }
export default LoginForm;
