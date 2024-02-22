import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Detail from "../pages/detail/Detail";
import Layout from "../components/units/layout/Layout";
import Login from "../pages/login/Login";
import { useSelector } from "react-redux";
import Profile from "../pages/profile/Profile";

const Router = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate replace to={"/"} />} />
            </Route>
            <Route path="/detail/:id" element={<Detail />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate replace to={"/login"} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
