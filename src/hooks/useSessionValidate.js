import { useDispatch } from "react-redux";
import api from "../apis/authApi";
import { useEffect } from "react";
import { setIsLoggedIn, setUserInfo } from "../redux/modules/authSlice";

const useSessionValidate = () => {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (error) {
      alert(error.response.data.message);
      localStorage.clear();
      dispatch(setIsLoggedIn(false));
      dispatch(setUserInfo(null));
    }
  };

  useEffect(() => {
    getUser();
  }, []);
};

export default useSessionValidate;
