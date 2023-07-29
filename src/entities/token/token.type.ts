import { ObjectId } from "typeorm";

export type TokenPayload = {
  id: ObjectId;
  name: string;
  email: string;
  credits: number;
  created_at: Date
  updated_at: Date
};