/**
 * @author CXY
 * @version Create Time:2023年4月1日
 * @Description Route設定、<Header>中搭配Menu顥示
 *
 */

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
import Login from "../pages/myLogin";
import Page403 from "../pages/403";
import QCInput from "./QCInput";
import QCReport from "./QCReport";
import Admin from "./Admin";
import { Provider } from "../routes/context";
// import publicRoutes from "../routes/publicRoutes";
// import ProtectedRoutes from "../routes/ProtectedRoutes";

const Mylayout = () => {
  // Connect to Server - commURL
  let API_URL = "http://127.0.0.1:9090";
  // let API_URL = "http://192.168.27.14:9090";
  // let API_URL = "http://www.tythac.com.vn:9090";

  const [user, setUser] = useState({
    name: "",
    id: "",
    loggedIn: false,
    role: "",
    token: "",
  });
  const contextValue = { user, setUser };

  const publicRoutes = [
    {
      path: "/",
      component: Blank,
      exact: true,
    },
    {
      path: "/login",
      component: Login,
      exact: true,
    },
    {
      path: "/page403",
      component: Page403,
      exact: true,
    },
  ];

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
              <Route>
                {publicRoutes.map(({ path, component, ...routes }) => (
                  <Route
                    key={path}
                    path={path}
                    element={component}
                    {...routes}
                  />
                ))}
              </Route>
            </Routes>
            <Routes>
              {/**  exact 作用:path的名稱絕對符合 */}
              {/* <Route path={"/"} element={<Blank />} exact />
              <Route
                path={"/login"}
                element={<Login commURL={API_URL} />}
                exact
              />
              <Route path={"/page403"} element={<Page403 />} exact /> */}

              {/* <Route element={<ProtectedRoutes />}> */}
              {user.role === "IT" ? (
                <Route path={"/admin"} element={<Admin />} />
              ) : (
                <Route
                  path={"/admin"}
                  element={<Navigate to="/page403" replace />}
                />
              )}
              <Route
                path={"/QCInput"}
                element={<QCInput commURL={API_URL} />}
                exact
              ></Route>
              <Route
                path={"/qcReport"}
                element={<QCReport commURL={API_URL} />}
                exact
              ></Route>
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
