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
import bcrypt from 'bcrypt';
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        user.id = uuidv4();
        user.password = bcrypt.hashSync(user.password, 10);
        yield writeUserToJsonFile(user);
        res.status(201).json({ userid: user.id });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const users = yield readFromJsonFile();
        const userFind = users.find((u) => {
            return u.userName === user.userName;
        });
        if (userFind) {
            if (bcrypt.compareSync(user.password, userFind === null || userFind === void 0 ? void 0 : userFind.password)) {
                res.status(200).json({ userid: userFind.id });
            }
            else {
                throw new Error("Incorrect password");
            }
        }
        else {
            throw new Error("Incorrect password");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
