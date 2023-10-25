/**
 * @author CXY
 * @version Create Time:2023年4月1日
 * @Description Route設定、<Header>中搭配Menu顥示
 *
 */

import React, { useState } from "react";
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Router已改新寫法
import { Layout } from "antd";

// Basic
import Header from "../components/header";
import Footer from "../components/footer";
// import Test from "./Test";

// Routes
import { Provider } from "../routes/context";
import PublicRoutes from "../routes/publicRoutes";
import ProtectedRoutes from "../routes/protectedRoutes";
import AdminRoutes from "../routes/adminRoutes";

const Mylayout = () => {
  // Connect to Server - commURL
  // let API_URL = "http://192.168.71.10:9090";
  // let API_URL = "http://www.tythac.com.vn:9090";
  let API_URL = "http://127.0.0.1:9090";

  const [user, setUser] = useState({
    name: "",
    id: "",
    loggedIn: false,
    role: "",
    token: "",
  });
  const contextValue = { user, setUser, API_URL };

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
              {PublicRoutes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={<Component />}
                  // {...routes}
                />
              ))}
              {AdminRoutes.map(({ path, component: Component, role }) =>
                // user.role === role ? (
                user.role === "" ? (
                  <Route
                    key={path}
                    path={path}
                    element={<Component commURL={API_URL} />}
                  />
                ) : (
                  <Route
                    key={path}
                    path={path}
                    element={<Navigate to="/page403" replace />}
                  />
                )
              )}
              {ProtectedRoutes.map(({ path, component: Component, role }) =>
                // user.role === role || user.role === "IT" ? (
                user.role === "" ? (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <Component
                        commURL={API_URL}
                        depName={path.substring(1)}
                      />
                    }
                  />
                ) : (
                  <Route
                    key={path}
                    path={path}
                    element={<Navigate to="/page403" replace />}
                  />
                )
              )}
            </Routes>
          </Router>
        </Provider>

        <Footer />
      </Layout>
    </div>
  );
};

export default Mylayout;
