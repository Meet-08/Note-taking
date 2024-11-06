import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen } from 'lucide-react';
import { Links } from '../Constent'

const Navbar = () => {
  return (
    <div className={`flex justify-center flex-1 sm:space-x-24 space-x-5 text-2xl bg-black`}>
      {
        Links.map(
          (link,index)=>{
            return<NavLink key={Math.random()} to={link.link} className={`bg-black text-white sm:mt-0 mt-2 px-2 py-2 rounded-md max-w-[100px] skew btn-gradient-border btn-glow`}>
              {
                index === 0 ? <Home className='h-5 w-5 mr-2' /> : <BookOpen className='h-5 w-5 mr-2' />
              }
              {link.name}
            </NavLink>
          }
        )
      }
    </div>
  )
}

export default Navbar