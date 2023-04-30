/**
 * @author CXY
 * @version Create Time:2023年4月17日
 * @Description Route設定-無權限公用頁面
 *
 */

import Login from "../pages/myLogin";
import Home from "../pages/blank";
import Page403 from "../pages/403";

// import React from "react";

const publicRoutes = [
  {
    path: "/",
    component: Home,
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

export default publicRoutes;
