/**
 * @author CXY
 * @version Create Time:2023年7月25日
 * @Description Route設定-權限驗證-暫時棄用
 *
 */

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import context from "../routes/context";

// function AuthRoute({ role, backUrl, ...otherProps }) {
function AuthRoute(route) {
  const { user } = useContext(context);

  console.log(route);

  // 如果用户有权限，就渲染对应的路由
  if (user && user.role === route.role) {
    // return <Route {...route} />;
    return "test";
  } else {
    // 如果没有权限，重定向到配置的默认路由
    return <Navigate to={route.backUrl} replace />;
  }
}
export default AuthRoute;
