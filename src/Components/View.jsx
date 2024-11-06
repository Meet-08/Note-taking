import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const View = () => {
  
  const { id } = useParams();
  const allNotes = useSelector((state)=>state.note.notes);
  const note = allNotes.find((e)=>e._id === id);

  return (
    <div className='flex flex-col h-screen w-screen justify-center sm:items-center bg-black text-black'>
      <div className='flex justify-center sm:items-center w-full '>
          <input type="text" placeholder='Enter title' value={note.title}
                  disabled
                  className='p-2 text-3xl font-bold rounded-lg border-[3p] w-[40%] bg-gray-200'/>
      </div>
      <div className='mt-5 flex justify-center '>
        <textarea value={note.content} 
                  placeholder='Enter your content here' rows={20} disabled
                  className='rounded-lg border-[3px] border-black min-w-[250px] md:min-w-[550px]  min-h-[350px] p-2 bg-gray-200' />
      </div>
    </div>
  )
}

export default View