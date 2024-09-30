import jsonfile from 'jsonfile';
import { User, Book } from '../models/types.js';
import { error } from 'console';
import { writeFile } from 'fs';

const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/users.json';

export const writeUserToJsonFile = async (user: User): Promise<void> => {
    const users: User[] = await jsonfile.readFile(DB_FILE_PATH);
    users.push(user);
    await jsonfile.writeFile(DB_FILE_PATH, users);
};

export const readFromJsonFile = async () => {
    const users: User[] = await jsonfile.readFile(DB_FILE_PATH);
    return users;
}

// export const writeBookToJsonFile = async (books: Book[]): Promise<void> => {
//     await jsonfile.writeFile(DB_FILE_PATH, JSON.stringify(books, null, 2), 'utf-8');
// }
