import { ObjectId } from 'mongodb';
export declare class BaseEntity {
    _id: ObjectId | string;
    created_at: Date;
    updated_at: Date;
}
