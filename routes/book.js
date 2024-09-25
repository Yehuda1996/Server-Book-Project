import express from 'express';
import { getBooks, add, update, delBook } from '../controllers/bookController.js';
const router = express.Router();
router.route('/getBooks').get(getBooks);
router.route('/add').post(add);
router.route('/update').put(update);
router.route('/delete').delete(delBook);
export default router;
