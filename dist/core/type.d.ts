export declare class QueryData<Entity> {
    skip?: number;
    take?: number;
    order?: {
        [P in keyof Entity]?: 'ASC' | 'DESC';
    };
    where?: {
        [P in keyof Entity]?: any;
    };
}
export declare class BaseMessage {
    message: string;
    constructor(message: string);
}
export type GenericObject = Record<string, any>;
