import { Outlet } from "react-router";
import AdminNav from "../components/Admin/AdminNav";

export default function AdminPage() {
  return (
    <section className="h-main">
      <AdminNav />
      <Outlet />
    </section>
  );
}
