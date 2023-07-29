import { ObjectId } from "typeorm";

export type TokenPayload = {
  id: ObjectId;
  name: string;
  email: string;
  created_at: Date
  updated_at: Date
};