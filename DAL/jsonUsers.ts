import jsonfile from 'jsonfile';
import { User } from '../models/types.js';
import { error } from 'console';



export const writeUserToJsonFile = async (user: User) => {
    jsonfile.readFile('./data/db.json')
    .then(users => {
        users.push(user);
        jsonfile.writeFile('./data/db.json', users, function(error){
            if (error){
                console.error(error);
            }
        })
    })
    .catch(error => console.error(error));
};

export const readFromJsonFile = async () => {
    const users = await jsonfile.readFile('./data/db.json');
    return users;
}
