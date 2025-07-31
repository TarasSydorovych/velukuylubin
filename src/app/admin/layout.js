// // src/app/admin/layout.js
// import ProtectedRoute from "@/app/components/protectedRoute";

// export default function AdminLayout({ children }) {
//   return <ProtectedRoute>{children}</ProtectedRoute>;
// }
// src/app/admin/layout.js
import ProtectedRoute from "../../components/protectedRoute";
import "./globals.css";
// Layout для адміністративної частини сайту
export default function AdminLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
