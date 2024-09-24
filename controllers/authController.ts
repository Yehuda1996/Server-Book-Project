import {Request, Response} from 'express'
import { User } from '../models/types.js';
import {v4 as uuidv4} from 'uuid';
import { readFromJsonFile, writeUserToJsonFile } from '../DAL/jsonUsers.js';
import bcrypt from 'bcrypt';



export const register = async (req: Request, res: Response) => {
    try{
        const user: User = req.body;
        user.id = uuidv4();
        user.password = bcrypt.hashSync(user.password, 10);
        await writeUserToJsonFile(user);
        res.status(201).json({userid: user.id})
    }
    catch(error){
        res.status(500).send(error)
    }

}

export const login = async (req: Request, res: Response) => {
    try{
        const user: User = req.body;
        const users: User[] = await readFromJsonFile();
        const userFind = users.find((u) => {
            return u.userName === user.userName
        })
        if(userFind){
            if(bcrypt.compareSync(user.password, userFind?.password)){
                res.status(200).json({userid: userFind.id})
            }
            else{
                throw new Error("Incorrect password");
            }
        }
        else{
            throw new Error("Incorrect password");
        }
    }
    catch(error){
        res.status(500).json(error);
    }
};