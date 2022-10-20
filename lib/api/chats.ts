import { BaseEntity, ChatData } from "../models";
import { api } from "./api";

export async function getChat(id: string) {
  return api<BaseEntity & { id: string; data: ChatData }>(`/chats/${id}`);
}
