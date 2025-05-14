import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/layout/app-sidebar"
import Header from "./header"

export function Dashboard() {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-(--sidebar-width) shadow-md">
        <AppSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-auto grid relative w-full h-screen overflow-x-hidden">
        <Header />
        <div className="absolute m-2 top-15 w-full">
          <Outlet />
        </div>

        
      </div>
    </div>
  )
}
