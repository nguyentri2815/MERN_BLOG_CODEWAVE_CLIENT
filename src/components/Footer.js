import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='text-white text-center mt-3'>
        <h3>@ Footer</h3>
        <ul className='flex items-center justify-center gap-3'>
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            <li>
                <Link to={'/'}>Home</Link>
            </li>
        </ul>
    </div>
  )
}

export default Footer