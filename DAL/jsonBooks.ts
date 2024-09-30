import jsonfile from 'jsonfile';
import { Book } from '../models/types';

const file = './books.json';

export const getBooksFromJsonFile = async (): Promise<Book[]> => {
    return jsonfile.readFile(file);
};

export const saveBooksToJsonFile = async (books: Book[]): Promise<void> => {
    await jsonfile.writeFile(file, books, {spaces: 2});
};