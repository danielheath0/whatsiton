import {  useAppDispatch } from "../../app/store";
import { useState } from "react";
import { loginUser } from "./usersSlice";
import { UserShort } from "../../interfaces/interfaces";

const LoginForm = ({ onLogin }: { onLogin: (token:string) => void }) => {
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
      const payload = actionResult.payload as unknown as { user: UserShort, token: string };
      if (payload.user) {
        onLogin(payload.token);
      }
    } else {
      if (actionResult.payload) {
        setErrorMessage(actionResult.payload as string);
      } else {
        setErrorMessage("An error occurred");
      }
    }
  };

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
