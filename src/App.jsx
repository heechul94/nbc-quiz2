import { useEffect } from "react";
import Router from "./shared/Router";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUserInfo } from "./redux/modules/authSlice";

function App() {
  const dispatch = useDispatch();

  const userStatus = !!localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    dispatch(setIsLoggedIn(userStatus));
    dispatch(setUserInfo(userInfo));
  }, []);

  return <Router />;
}

export default App;
