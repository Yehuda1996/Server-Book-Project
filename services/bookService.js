var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBooksFromJsonFile, saveBooksToJsonFile } from '../DAL/jsonBooks.js';
export const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return getBooksFromJsonFile();
});
export const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield getBooksFromJsonFile();
    return books.find(b => typeof b.id === 'number' && b.id === id);
});
export const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield getBooksFromJsonFile();
    books.push(book);
    yield saveBooksToJsonFile(books);
});
export const updateBook = (updatdeBook) => __awaiter(void 0, void 0, void 0, function* () {
    let books = yield getBooksFromJsonFile();
    books = books.map(book => (book.id === updatdeBook.id ? updatdeBook : book));
    yield saveBooksToJsonFile(books);
});
export const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let books = yield getBooksFromJsonFile();
    books = books.filter(b => typeof b.id === 'number' && b.id !== id);
    yield saveBooksToJsonFile(books);
});
