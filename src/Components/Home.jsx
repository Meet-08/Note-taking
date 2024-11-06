import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToNotes, updateToNotes } from '../redux/noteSlice';

const Home = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [searchId,setSearchId] = useSearchParams();
  const allNotes = useSelector((state)=> state.note.notes);
  const noteId = searchId.get("noteId");
  const dispatch = useDispatch();

  const createPaste = ()=>{
    const note = {
      title : title,
      content : content,
      _id : noteId || Date.now().toString(3),
      createdAt:new Date().toISOString()
    }

    if(noteId){
      dispatch(updateToNotes(note));
    }else{
      dispatch(addToNotes(note));
    }
    setTitle("");
    setContent("");
    setSearchId({});
  }

  useEffect(()=>{
    if(noteId){
      const note = allNotes.find((p)=> p._id === noteId);
      setTitle(note.title);
      setContent(note.content);
    }
    
  }, [noteId])

  return (
    <div className='flex flex-col h-screen w-screen justify-center sm:items-center bg-black'>
      <div className=' sm:mt-0 mt-[100px] flex justify-center sm:items-center w-full'>
          <input type="text" placeholder='Enter title' value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  className='p-2 rounded-lg font-semibold  sm:w-[77%] w-[250px]  text-[20px] leading-[32px] outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 resize-none'/>

          <button className='bg-blue-600 hover:bg-blue-800 font-bold text-white sm:p-[11px] p-0 rounded-md mx-3 sm:w-[11%] w-[100px] sm:text-[18px] text-[14px] '
                  onClick={createPaste}>
            {
              noteId ? "Update Note" : "Create Note"
            }
          </button>
      </div>

      <div className='mt-5 md:w-full flex justify-center'>
        <textarea value={content} onChange={(e)=>setContent(e.target.value)}
                  placeholder='Enter your content here' rows={20}
                  className='rounded-lg border-[3px] text-xl  w-[90%] md:min-w-[350px] min-h-[350px] p-2 outline-none focus:ring-4 focus:ring-blue-600 transition-all duration-300 resize-none' />
      </div>

    </div>
  )
}

export default Home