import { useState } from "react";
import LoginForm from "../../components/units/loginComponent/loginForm/LoginForm";
import RegistForm from "../../components/units/loginComponent/registForm/RegistForm";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const onClickFormToggle = () => {
    setIsLoginForm((prev) => !prev);
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {isLoginForm ? (
        <LoginForm formToggle={onClickFormToggle} />
      ) : (
        <RegistForm formToggle={onClickFormToggle} />
      )}
    </main>
  );
};

export default Login;
