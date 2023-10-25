/**
 * @author CXY
 * @version Create Time:2023年7月25日
 * @Description Route設定-最高權限頁面
 *
 */

import Admin from "../pages/Admin";
import Warehouse from "../pages/mes_ywcp";
import testTable from "../pages/myTableTest";

const AdminRoutes = [
  {
    path: "/admin",
    component: Admin,
    exact: true,
    role: "IT", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/mesYWCP",
    component: Warehouse,
    exact: true,
    role: "IT", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },

  {
    path: "/testTable",
    component: testTable,
    exact: true,
    role: "IT", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
];

export default AdminRoutes;
