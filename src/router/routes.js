import Login from "pages/Login.vue"

const routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/forgot-password",
    component: () => import("pages/ForgotPassword.vue") 
  },
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [ 
      { path: "", component: () => import("pages/Announcement.vue") },
      { path: "announcement", component: () => import("pages/Announcement.vue") },
      { path: "attendance", component: () => import("pages/Attendance.vue") },
      { path: "leaves", component: () => import("pages/Leaves.vue") },
      { path: "payslip/:id", component: () => import("pages/Payslip.vue") },
      { path: "payslips", component: () => import("pages/AllPayslips.vue") },
      { path: "myprofile", component: () => import("pages/MyProfile.vue") },
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
