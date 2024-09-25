var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllBooks, addBook, updateBook, deleteBook } from "../services/bookService.js";
export const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json("Id required.");
        }
        const userBooks = yield getAllBooks(id);
        res.status(200).json({ userBook: userBooks });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
export const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title } = req.body;
        if (!id || !title) {
            res.status(400).json("Id and title required");
        }
        const newBook = yield addBook(id, title);
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
export const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title } = req.body;
        if (!id || !title) {
            res.status(400).json("Id and title required");
        }
        const updatedBook = yield updateBook(id, title, title);
        res.status(204).json(updatedBook);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
});
export const delBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title } = req.body;
        if (!id || !title) {
            res.status(400).json("Id and title required");
        }
        const deletededBook = yield deleteBook(id, title);
        res.status(200).json(deletededBook);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
});
