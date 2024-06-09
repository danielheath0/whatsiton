import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserForm = ({onLogin}: {onLogin: any}) => {
  const [currentForm, setCurrentForm] = useState<"REGISTER" | "LOGIN">();

  return <div>
    <button onClick={() => setCurrentForm("REGISTER")}>Register</button>
    <button onClick={() => setCurrentForm("LOGIN")}>Login</button>
    {currentForm === "REGISTER" && <RegisterForm />}
    {currentForm === "LOGIN" && <LoginForm onLogin={(onLogin)}/>}

  </div>;
};
export default UserForm;
