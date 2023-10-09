export type MongoError = {
    errno: number;
    sqlMessage: string;
    stack: string;
    message: string;
};
