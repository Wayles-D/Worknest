import { Outlet } from 'react-router'
import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function MainLayouts() {
  return (
    <>
    <header>
      <div className="container">
     <Navbar />
      </div>
    </header>

    <main>
      <div className='container pt-25'>
        <Outlet />
      </div>
    </main>

    <footer>
      <div className='w-full'>
       <Footer />
      </div>
    </footer>
    </>
  )
}
