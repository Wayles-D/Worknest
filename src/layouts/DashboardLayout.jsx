import { Outlet } from "react-router"

export default function DashboardLayout() {
  return (
    <>
    <div>
      <aside>Sidebar</aside>
      <section>
        <Outlet />
      </section>
    </div>
    </>
  )
}
