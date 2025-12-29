import Note from '../models/notes.js';
import mongoose from 'mongoose';
import authMiddleware from '../middleware/auth.js';
import User from '../models/user.js';

const createNote=async (req,res)=>{
    try{

        const {title,content,tags=[],isPublic}=req.body
        const note= new Note({
            title,
            content,
            tags,
            userId:req.userId,
            isPublic
        });
        await note.save();

        const user=await User.findById(req.userId);
        user.noteIds.push(note._id);
        await user.save();
        res.status(201).json({message:"Note created successfully",note});
    }catch(error){
        res.status(500).json({message:"Error creating note",error:error.message});
    }
        

}

const deleteNote=async (req,res)=>{
    try{
        const {noteId}=req.body;
        const note=await Note.findByIdAndDelete(noteId);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json({message:"Note deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Error deleting note",error:error.message});
    }
}

export {createNote,deleteNote};