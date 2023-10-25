/**
 * @author CXY
 * @version Create Time:2023年7月25日
 * @Description Route設定-需權限頁面
 *
 */

// QC
import QCInput from "../pages/QCInput";
import QCReport from "../pages/QCReport";
import QCInspectionRoom from "../pages/qcInspectionRoom";
import ERPAutoDistribution from "../pages/erp_autodistribution";

// MES
import MesLine from "../pages/mes_line";
import MesFront from "../pages/mes_front";

const ProtectedRoutes = [
  // ERP
  {
    path: "/erp_autodistribution",
    component: ERPAutoDistribution,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  // MES
  {
    path: "/DT_G-LINE1",
    component: MesFront,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/DT_G-LINE2",
    component: MesFront,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/DT_G-LINE3",
    component: MesFront,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/DT_G-LINE5",
    component: MesFront,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/DT_G-LINE6",
    component: MesFront,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/DT_G-LINE7",
    component: MesFront,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/DT_G-LINE8",
    component: MesFront,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/vDT_G-LINE1",
    component: MesLine,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/vDT_G-LINE2",
    component: MesLine,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/vDT_G-LINE3",
    component: MesLine,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/vDT_G-LINE5",
    component: MesLine,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/vDT_G-LINE6",
    component: MesLine,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/vDT_G-LINE7",
    component: MesLine,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/vDT_G-LINE8",
    component: MesLine,
    exact: true,
    role: "MES", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  // {
  //   path: "/mesLine",
  //   component: MesLine,
  //   exact: true,
  //   role: "MES", // 当前路由需要的角色权限
  //   backUrl: "/page403", // 不满足权限跳转的路由
  // },
  // QC
  {
    path: "/QCInput",
    component: QCInput,
    exact: true,
    role: "QC", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/qcReport",
    component: QCReport,
    exact: true,
    role: "QC", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
  {
    path: "/qcInspectionRoom",
    component: QCInspectionRoom,
    exact: true,
    role: "QC", // 当前路由需要的角色权限
    backUrl: "/page403", // 不满足权限跳转的路由
  },
];

export default ProtectedRoutes;
