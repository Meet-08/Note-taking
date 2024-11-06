import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({title,handleFunc,link,children}) => { 
  const btnStyle = 'bg-slate-900 flex  items-center  text-white p-3 m-2 w-[50px] sm:w-auto rounded-lg hover:bg-slate-700 note-btn z-[2]';
  const spanStyle = 'bg-purple-500 mr-2 rounded-full object-contain p-[3px]';
  
  if(link){
    return <Link to={link}>
      <button className={`${btnStyle}`}>
        <span className={spanStyle}>{children}</span>
          <p className='sm:block hidden'>{title}</p>
      </button>
    </Link>
  }

  return(
    <button className={btnStyle} onClick={handleFunc}>
      <span className={spanStyle}>{children}</span>
      <p className='sm:block hidden '>{title}</p>
    </button>
  )
}

export default Button