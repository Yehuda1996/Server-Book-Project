import { Request, Response } from "express";
import { getAllBooks, addBook, updateBook, deleteBook } from "../services/bookService.js";
import { User, Book, userNamePassword } from "../models/types.js";

export const getBooks = async (req: Request, res: Response) => {
    try{
        const {id}: User = req.body;
        if(!id){
            res.status(400).json("Id required.");
        }
        const userBooks = await getAllBooks(id); 
        res.status(200).json({userBook: userBooks})
    }
    catch(error){
        res.status(500).json({message: error});
    }
};

export const add = async (req: Request, res: Response) => {
    try{
        const {id, title} = req.body;
        if(!id || !title){
            res.status(400).json("Id and title required");
        }
        const newBook = await addBook(id, title);
        res.status(201).json(newBook);
    }
    catch(error){
        res.status(500).json({message: error});
    }
}

export const update = async (req: Request, res: Response) => {
    try{
        const {id, title} = req.body;
        if(!id || !title){
            res.status(400).json("Id and title required");
        }
        const updatedBook = await updateBook(id, title, title);
        res.status(204).json(updatedBook);
    }
    catch(error){
        res.status(404).json({message: error});
    }
}

export const delBook = async (req: Request, res: Response) => {
    try{
        const {id, title} = req.body;
        if(!id || !title){
            res.status(400).json("Id and title required");
        }
        const deletededBook = await deleteBook(id, title);
        res.status(200).json(deletededBook);
    }
    catch(error){
        res.status(404).json({message: error});
    }
}