import React from 'react'
import { Link } from 'react-router'

export default function Logo() {
  return (
    <>
       <Link to="/"><img src='/logo.jpg' alt='logo' className='w-30 mb-3'/></Link>
    </>
  )
}
