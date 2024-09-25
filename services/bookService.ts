import { Book, User } from '../models/types.js';
import {v4 as uuidv4} from 'uuid';
import { readFromJsonFile, writeUserToJsonFile } from '../DAL/jsonUsers.js';
import axios from 'axios';


export const getAllBooks = async (userId: string): Promise<Book[]> => {
    const users = await readFromJsonFile();
    const user = users.find(u => u.id === userId);
    if(!user){
        throw new Error("User Id does not exist");
    }
    return user.books ?? [];
}

export const addBook = async (userId: string, bookName: string): Promise<Book> => {
    const users = await readFromJsonFile();
    const user = users.find(u => u.id === userId);
    if(!user){
        throw new Error("User Id does not exist");
    }

    const bookInfo = await getBookInfoFromAPI(bookName);
    if(!bookInfo){
        throw new Error("Book information not found");
    }     
    const newBook: Book = {
        id: uuidv4(),
        ...bookInfo
    };

    user.books = user.books ? [...user.books, newBook] : [newBook];

    await writeUserToJsonFile(user);
    return newBook;
}

const getBookInfoFromAPI = async(bookName: string) => {
    try{
        const response = await axios.get(`https://freetestapi.com/api/v1/books?search=[${bookName}]`);
        return response.data
    }
    catch(error){
        console.error("Error fetching book info:", error);
        return null;
    }
}

export const updateBook = async (userId: string, bookId: string, updatedData: Partial<Book>): Promise<Book> => {
    const users = await readFromJsonFile();
    const user = users.find(u => u.id === userId);
    if(!user){
        throw new Error("User Id does not exist");
    }

    const bookIndex = user.books?.findIndex(b => b.id === bookId);
    if(bookIndex === undefined || bookIndex === -1){
        throw new Error("Book ID not found.")
    }
    const updatedBook = {...user.books![bookIndex], ...updatedData};
    user.books![bookIndex] = updatedBook;
    return updatedBook;
}

export const deleteBook = async (userId: string, bookId: string) => {
    const users = await readFromJsonFile();
    const user = users.find(u => u.id === userId);
    if(!user){
        throw new Error("User Id does not exist");
    }

    const bookIndex = user.books?.findIndex(b => b.id === bookId);
    if(bookIndex === undefined || bookIndex === -1){
        throw new Error("Book ID not found.")
    }

    user.books!.splice(bookIndex, 1);

    await writeUserToJsonFile(user);
}