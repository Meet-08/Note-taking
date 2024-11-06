import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    notes : localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []
}

export const noteSlice = createSlice(
    {
        name : "note",
        initialState,
        reducers : {
            addToNotes : (state,action)=>{
                const note = action.payload;
                const index = state.notes.findIndex((item) => item.title === note.title);

                if(index >= 0){
                    toast.error("Title already exist !");
                    return;
                }
                state.notes.push(note);
                localStorage.setItem("notes",JSON.stringify(state.notes));
                toast.success("Note created successfully ");
            },
            updateToNotes : (state,action)=>{
                const note = action.payload;
                const index = state.notes.findIndex((item) => (item?._id === note?._id));
                if(index >= 0){
                    state.notes[index] = note;
                    localStorage.setItem("notes",JSON.stringify(state.notes));
                    toast.success("Note updated successfully");
                }
            },
            resetAllNotes : (state,action)=>{
                state.notes = [];
                localStorage.getItem("notes");
            },
            removeFromNote : (state,action)=>{
                const noteId = action.payload;
                const index = state.notes.findIndex((item)=> item._id === noteId);

                if(index >= 0){
                    state.notes.splice(index,1);
                    localStorage.setItem("notes",JSON.stringify(state.notes));
                    toast.success("Note deleted successfully");
                }else{
                    toast.error("Note does not exist");
                }
            }
        }
    }
) 

export const { updateToNotes, addToNotes, resetAllNotes, removeFromNote } = noteSlice.actions
export default noteSlice.reducer