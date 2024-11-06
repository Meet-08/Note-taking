import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button';
import { Calendar, Copy, Eye, PencilLine, Trash2, Share } from 'lucide-react'
import { removeFromNote } from '../redux/noteSlice';
import { FormatDate }  from '../Constent/formatDate'
import toast from 'react-hot-toast';

const Notes = () => {
  
  const [searchTerm,setSearchTerm] = useState("");
  const notes = useSelector((state)=> state.note.notes);
  const dispatch = useDispatch();

  const filterData = notes.filter(
    (note) => note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (noteId) => {
    dispatch(removeFromNote(noteId))
  }

  const handleCopy = (content)=>{
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  }

  const handleShare = async({title, content})=>{
    const shareData = {
      title:title,
      text:content,
      // url:window.location.href
    }

    try{
      if(navigator.share){
        await navigator.share(shareData);
      }else{
        await navigator.clipboard.writeText(`${title}\n\n${content}\n\n${window.location.href}`);
      }
    }catch{
      showNotification('Failed to share content', 'error');
    }
  } 
  
  return (
    <div className='bg-black text-white'>
        <input type="search" placeholder='Search here' 
                value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
                className='p-2 rounded-lg text-black min-w-[65%] my-5 border-2 border-black relative top-3 left-[20%] text-[20px] leading-[30px]   outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 resize-none'/>
        
        <h2 className="px-4 text-4xl font-bold border-y border-[rgba(128,121,121,0.3)] pb-4 text-center">
            All Notes
        </h2>

        <div className='flex flex-col gap-5 mt-2 items-center'>
            {
              filterData.length > 0 &&
              filterData.map(
                (note) =>{
                  return <div key={note._id} className='border border-gray-300 rounded-xl w-[95%]'>
                    
                    <div className=''>
                      <p className='text-[60px] leading-[75px] text-center font-bold border-b border-[rgba(128,121,121,0.3)]'>
                        {note.title}
                      </p>
                      <p className='max-h-[75px] overflow-hidden border-b border-[rgba(128,121,121,0.3)]'>
                        {note.content}
                      </p>
                    </div>

                    <div className='md:flex  grid grid-cols-3 justify-evenly gap-4'>
                      <Button title={`Edit`} logo={PencilLine} link={`/?noteId=${note?._id}`}>
                        <PencilLine />
                      </Button>
                      <Button title={`View`}  link={`/notes/${note?._id}`} >
                        < Eye />
                      </Button>         
                      <Button title={`Delete`} handleFunc={()=>{handleDelete(note?._id)}}>
                          <Trash2 />
                      </Button>         
                      <Button title={`Copy`} handleFunc={()=>{handleCopy(note.content)}}>
                          <Copy />  
                      </Button>         
                      <Button title={`Share`} handleFunc={()=>{handleShare(note)}}>
                          <Share />
                      </Button>         
                    </div>
                    
                    <div className='text-center text-[16px] flex space-x-2 justify-center space-y-3'>
                      <Calendar />
                      {FormatDate(note.createdAt)}
                    </div>

                  </div>
                }
              )
            }
        </div>
    </div>
  )
}

export default Notes