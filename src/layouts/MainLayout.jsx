import { Outlet } from 'react-router'
import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function MainLayouts() {
  return (
    <>
    <Navbar />
    <main>
        <Outlet />
    </main>
    <Footer />
    </>
  )
}
