import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Router已改新寫法
import { Layout } from "antd";

import Header from "../components/header";
import Footer from "../components/footer";
import Blank from "../pages/blank";
import Login from "./Login";
import QCInput from "./QCInput";
import Admin from "./Admin";
import { Provider } from "../routes/context";
// import ProtectedRoutes from "../routes/ProtectedRoutes";

const Mylayout = () => {
  const [user, setUser] = useState({
    name: "",
    loggedIn: false,
    role: "",
  });
  const contextValue = { user, setUser };

  return (
    <div>
      <Layout>
        <Provider value={contextValue}>
          <Router>
            {/** Menu 中因為有 Link所以必需包在Router中*/}
            <Header
              //  將Header固定在上方
              style={{
                position: "fixed",
                zIndex: 1,
                width: "100%",
              }}
            />
            <Routes>
              {/**  exact 作用:path的名稱絕對符合 */}
              <Route path={"/"} element={<Blank />} exact></Route>
              <Route path={"/login"} element={<Login />} exact></Route>
              {/* <Route element={<ProtectedRoutes />}> */}
              <Route path={"/QCInput"} element={<QCInput />} exact></Route>
              <Route path={"/admin"} element={<Admin />} exact></Route>
              <Route path={"/*"} element={<Navigate to="/" replace />}></Route>
              {/* </Route> */}
            </Routes>
          </Router>
        </Provider>
        <Footer />
      </Layout>
    </div>
  );
};

export default Mylayout;
