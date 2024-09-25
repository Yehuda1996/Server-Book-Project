var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from 'uuid';
import { readFromJsonFile, writeUserToJsonFile } from '../DAL/jsonUsers.js';
import axios from 'axios';
export const getAllBooks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const users = yield readFromJsonFile();
    const user = users.find(u => u.id === userId);
    if (!user) {
        throw new Error("User Id does not exist");
    }
    return (_a = user.books) !== null && _a !== void 0 ? _a : [];
});
export const addBook = (userId, bookName) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const user = users.find(u => u.id === userId);
    if (!user) {
        throw new Error("User Id does not exist");
    }
    const bookInfo = yield getBookInfoFromAPI(bookName);
    if (!bookInfo) {
        throw new Error("Book information not found");
    }
    const newBook = Object.assign({ id: uuidv4() }, bookInfo);
    user.books = user.books ? [...user.books, newBook] : [newBook];
    yield writeUserToJsonFile(user);
    return newBook;
});
const getBookInfoFromAPI = (bookName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(`https://freetestapi.com/api/v1/books?search=[${bookName}]`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching book info:", error);
        return null;
    }
});
export const updateBook = (userId, bookId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const users = yield readFromJsonFile();
    const user = users.find(u => u.id === userId);
    if (!user) {
        throw new Error("User Id does not exist");
    }
    const bookIndex = (_a = user.books) === null || _a === void 0 ? void 0 : _a.findIndex(b => b.id === bookId);
    if (bookIndex === undefined || bookIndex === -1) {
        throw new Error("Book ID not found.");
    }
    const updatedBook = Object.assign(Object.assign({}, user.books[bookIndex]), updatedData);
    user.books[bookIndex] = updatedBook;
    return updatedBook;
});
export const deleteBook = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const users = yield readFromJsonFile();
    const user = users.find(u => u.id === userId);
    if (!user) {
        throw new Error("User Id does not exist");
    }
    const bookIndex = (_a = user.books) === null || _a === void 0 ? void 0 : _a.findIndex(b => b.id === bookId);
    if (bookIndex === undefined || bookIndex === -1) {
        throw new Error("Book ID not found.");
    }
    user.books.splice(bookIndex, 1);
    yield writeUserToJsonFile(user);
});
