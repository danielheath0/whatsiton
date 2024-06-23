import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../app/store";
// import { useNavigate } from "react-router-dom";
import { registerUser } from "./usersSlice";
import { useSelector } from "react-redux";
import countries from "../../../countries-list.json";

const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const error = useSelector((state: RootState) => state.users.error);

  const status = useSelector((state: RootState) => state.users.status);

  // const navigate = useNavigate();

  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    uName: "",
    password: "",
    countryCode: "",
  });

  // useEffect(() => {
  //   if (status === "succeeded") {
  //     setUser({
  //       fName: "",
  //       lName: "",
  //       email: "",
  //       uName: "",
  //       password: "",
  //       countryCode: "",
  //     });
  //     navigate("/login"); // navigate to login page
  //   }
  // }, [status, navigate]);
  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    dispatch(registerUser(user));
  };

  useEffect(() => {
    if (status === "succeeded") {
      setUser({
        fName: "",
        lName: "",
        email: "",
        uName: "",
        password: "",
        countryCode: "",
      });
    }
  }, [status]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fName">
            First Name: 
            <input
              type="text"
              id="fName-register"
              name="fName"
              autoComplete="given-name"
              value={user.fName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="lName">
            Last Name: 
            <input
              type="text"
              id="lName-register"
              name="lName"
              autoComplete="family-name"
              value={user.lName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email-register"
              name="email"
              autoComplete="email"
              value={user.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="uName">
            Username:
            <input
              type="text"
              id="uName-register"
              name="uName"
              autoComplete="username"
              value={user.uName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password-register"
              name="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="countryCode">
            Country:
            <select
              name="countryCode"
              value={user.countryCode}
              onChange={handleChange}>
              <option>Please select:</option>
              {countries.map((country) => (
                <option key={country.country_code} value={country.country_code}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Register</button>
      </form>

      {error && <p>{error}</p>}
    </>
  );
};
export default RegisterForm;

//TODO: add validation, error handling, and success message. Autocomplete.
