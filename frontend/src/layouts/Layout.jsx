import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import React from "react"

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col px-1 pb-2 max-sm:p-0">
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
