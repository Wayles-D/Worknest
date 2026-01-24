import React from 'react'
import { NavLink } from 'react-router'


const navLink = [
  { name: 'Home', path: '/' },
]

export default function Navbar() {
  return (
    <nav className='fixed top-0 left-0 w-full bg-red-500 shadow z-50'>
      <div className='flex justify-between items-center p-4'>
         <img src="/worknestLogo.png" alt="logo" />

        <div>

        </div>
        <div></div>

         
      </div>
    </nav>
    <>
    <header className=''>

    </header>
    </>
  )
}
