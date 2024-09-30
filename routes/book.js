import express from 'express';
import { getBooks, addBook, updateBookById, deleteBookById } from '../controllers/bookController.js';
const router = express.Router();
router.route('/getBooks').get(getBooks);
router.route('/add').post(addBook);
router.route('/update').put(updateBookById);
router.route('/delete').delete(deleteBookById);
export default router;
