import { Book, User } from '../models/types.js';
import {v4 as uuidv4} from 'uuid';
import { getBooksFromJsonFile, saveBooksToJsonFile } from '../DAL/jsonBooks.js';
import { readFromJsonFile, writeUserToJsonFile } from '../DAL/jsonUsers.js';
import axios from 'axios';


export const getAllBooks = async (): Promise<Book[]> => {
    return getBooksFromJsonFile()
};

export const getBookById = async (id: number): Promise<Book | undefined> => {
    const books = await getBooksFromJsonFile();
    return books.find(b => typeof b.id === 'number' && b.id === id);
};

export const createBook = async (book: Book): Promise<void> => {
    const books = await getBooksFromJsonFile();
    books.push(book);
    await saveBooksToJsonFile(books);
};

export const updateBook = async (updatdeBook: Book): Promise<void> => {
    let books = await getBooksFromJsonFile();
    books = books.map(book => (book.id === updatdeBook.id ? updatdeBook : book));
    await saveBooksToJsonFile(books);
};

export const deleteBook = async (id: number): Promise<void> => {
    let books = await getBooksFromJsonFile();
    books = books.filter(b => typeof b.id === 'number' && b.id !== id);
    await saveBooksToJsonFile(books);
}