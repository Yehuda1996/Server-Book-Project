import { Request, Response, NextFunction } from "express";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../services/bookService.js";
import { User, Book, userNamePassword } from "../models/types.js";

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const books = await getAllBooks();
        res.json(books);
    }
    catch(error){
        next(error);
    }
};

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const book = await getBookById(Number(req.params.id));
        if(book){
            res.json(book);
        }
        else{
            res.status(404).json({message: "Book not found"});
        }
    }
    catch(error){
        next(error);
    }
};

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const book: any = req.body;
        await createBook(book);
        res.status(201).json(book);
    }
    catch(error){
        next(error);
    }
};

export const updateBookById = async (req: Request, res: Response, next: NextFunction) => {
    try{
         const book: any = req.body;
         book.id = Number(req.params.id);
         await updateBook(book);
         res.json(book);
    }
    catch(error){
        next(error);
    }
};

export const deleteBookById = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await deleteBook(Number(req.params.id));
        res.status(204).end();
    }
    catch(error){
        next(error);
    }
}