import { ObjectId } from 'mongodb';
export declare class Token {
    _id: ObjectId | string;
    token: string;
    user_id: ObjectId;
    constructor(token: string, user_id: string);
}
